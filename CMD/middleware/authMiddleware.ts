import { NextFunction, Request, Response } from "express";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
  user?: any;
}

const isAuthenticated = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET as string);
    console.log("Decoded data", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

export default isAuthenticated;
