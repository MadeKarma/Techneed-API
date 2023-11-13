import { decodeToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  loggedUser?: {
    id: number;
    role: number;
  };
}

export function auth(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    if (req.headers.authorization) {
      const token: string = req.headers.authorization;
      req.loggedUser = decodeToken(token);
      next();
    } else {
      throw new Error("Invalid auth");
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ Error: { message: error.message } });
  }
}

export async function authorizeAdmin(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (req.loggedUser) {
      const user = req.loggedUser;

      // role 1 as an admin
      if (user.role === 1) {
        next();
      } else {
        throw new Error("Forbidden access");
      }
    } else {
      throw new Error("Forbidden access");
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ Error: { message: error.message } });
  }
}
