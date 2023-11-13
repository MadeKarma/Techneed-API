import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { UserRequestBody } from "../interface/user";
import { decodeHash, generateHash } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export default class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          role: true,
        },
      });

      if (result && Object.keys(result).length > 0) {
        res.status(200).json({ data: result });
      } else {
        throw new Error("User not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body as UserRequestBody;

      if (!username || !password) {
        throw new Error("All fields are required");
      }

      const hashedPassword = generateHash(password);

      const result = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
          }
      });

      res.status(201).json({ data: result, message: "Register successfully" });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        console.error("Username is already exits");
        res
          .status(400)
          .json({ Error: { message: "Username is already exits" } });
      }
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body as UserRequestBody;
      

      const findUser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (findUser) {
        const isPasswordValid = decodeHash(password, findUser.password);

        if (isPasswordValid) {
          const { id, username, role } = findUser;
          const createToken = generateToken({
            id,
            username,
            role,
          });

          res.status(200).json({
            token: createToken,
            message: "Login successfully",
          });
        } else {
          throw new Error("Invalid username and password");
        }
      } else {
        throw new Error("Invalid username and password");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }
}
