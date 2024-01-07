import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorFunction } from "../utils/error";
import { IUsers, Users } from "../models/user.model";

export interface AuthenticatedRequest extends Request {
  user?: IUsers | null;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json(errorFunction(true, "no token found"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    const user = await Users.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json(errorFunction(true, "Invalid token"));
    }
    req.user = user
    next();
  } catch (err) {
    res.status(401).json(errorFunction(true, "Invalid token"));
  }
};
