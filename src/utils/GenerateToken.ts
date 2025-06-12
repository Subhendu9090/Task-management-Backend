import jwt,{ Secret, SignOptions } from "jsonwebtoken";

interface payloadType {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
}
const GenerateToken = (payload: payloadType, time: number): string => {
  const secretKey: Secret | undefined = process.env.TOKEN_SECRET;
  console.log("secretKey",secretKey);
  
  if (!secretKey) {
    throw new Error("TOKEN_SECRET is not defined in environment variables");
  }

  const options: SignOptions = { expiresIn: time };

  return jwt.sign(payload, secretKey, options);
};

export default GenerateToken