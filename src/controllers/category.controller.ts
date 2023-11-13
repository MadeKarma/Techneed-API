import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { CategoryRequestBody } from "../interface/category";

const prisma = new PrismaClient();

export default class CategoryController {
  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const result = await prisma.category.findMany();

      if (result && Object.keys(result).length > 0) {
        res.status(200).json({ data: result });
      } else {
        throw new Error("Category not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const result = await prisma.category.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (result) {
        res.status(200).json({ data: result });
      } else {
        throw new Error("Category not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body as CategoryRequestBody;

      if (!name) {
        throw new Error("All fields are required");
      }

      const result = await prisma.category.create({
        data: {
          name: name,
        },
      });

      res.status(201).json({ data: result, message: "Data category was created successfully" });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body as CategoryRequestBody;

      if (!name ) {
        throw new Error("All fields are required");
      }

      const result = await prisma.category.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: name,
        },
      });

      res.status(201).json({ data: result, message: "Data category was created successfully" });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.error("Id product not found");
        res
          .status(400)
          .json({ Error: { message: "Id product not found" } });
      }
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      await prisma.category.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      res.status(200).json({ data: "Category has been successfully deleted" });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        console.error("Id category not found");
        res
          .status(400)
          .json({ Error: { message: "Id category not found" } });
      }
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }
}
