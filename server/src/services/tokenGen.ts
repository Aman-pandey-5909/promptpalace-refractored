import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";

export const generateToken = (id: string, expiresIn?: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {expiresIn: expiresIn});
};

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string);
