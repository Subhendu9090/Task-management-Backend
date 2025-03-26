import { Request, Response } from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import GenerateToken from "../utils/GenerateToken.js";
import { AuthRequest } from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body;

    if ([name, email, password].some((val) => val?.trim() === "")) {
      return res.status(401).json({
        message: "Provide all required field",
        fields: "name,email,password",
      });
    }
    const existedEmail = await User.findOne({ where: { email: email } });
    if (existedEmail) {
      return res
        .status(404)
        .json({ message: "This email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
    });
    if (!user) {
      throw new Error("user creation failed");
    }
    return res.status(201).json({ message: "register successful", data: user });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const existedUser = (await User.findOne({ where: { email } })) as any;
    if (!existedUser) {
      return res
        .status(401)
        .json({ message: `user not found with this ${email}` });
    }

    const isCorrect = await bcrypt.compare(
      password,
      existedUser.get("password") as string
    );
    if (!isCorrect) {
      return res.status(402).json({ message: "Enter correct password" });
    }
    const payload = {
      id: existedUser.get("id") as string,
      email: existedUser.get("email") as string,
      role: existedUser.get("role") as string,
      name: existedUser.get("name") as string,
    };
    const accessToken = GenerateToken(payload, 3600);
    const refreshToken = GenerateToken(payload, 7200);

    existedUser.refreshToken = refreshToken;
    await existedUser.save();

    const userResponse = existedUser.toJSON();
    delete userResponse.password;
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Login Success", data: userResponse });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const Logout = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user.id;
    const user = (await User.findOne({ where: { id: userId } })) as any;
    user.refreshToken = "";
    await user.save();
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "Logout Successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const GenerateNewAccessToken = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(404).json({ message: "refreshToken Not Found" });
    }
    const existedUser = (await User.findOne({
      where: { refreshToken: refreshToken },
    })) as any;
    
    if (!existedUser) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const payload = {
      id: existedUser.get("id") as string,
      email: existedUser.get("email") as string,
      role: existedUser.get("role") as string,
      name: existedUser.get("name") as string,
    };
    const newAccessToken = GenerateToken(payload, 3600);

    return res.status(201).json({
      message: "New Token Generated",
      data: {
        accessToken: newAccessToken,
        refreshToken: existedUser.refreshToken,
      },
    });
  } catch (error) {
    console.error("Find user error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const FindOwnUser = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res
      .status(200)
      .json({ data: req.user, message: "user fetched successfully" });
  } catch (error) {
    console.error("Find user error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login, Register, FindOwnUser, Logout, GenerateNewAccessToken };
