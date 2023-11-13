import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { ProductRequestBody } from "../interface/product";

interface CustomRequest extends Request {
  loggedUser?: {
    id: number;
    role: number;
  };
}

const prisma = new PrismaClient();

export default class ProductController {
  static async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const result = await prisma.product.findMany();

      if (result && Object.keys(result).length > 0) {
        res.status(200).json({ data: result });
      } else {
        throw new Error("Product not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const result = await prisma.product.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      if (result) {
        res.status(200).json({ data: result });
      } else {
        throw new Error("Product not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async addProduct(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { name, stock, price, categoryId } = req.body as ProductRequestBody;
      if (req.loggedUser) {
        const user = req.loggedUser;
        
        if (!name || !categoryId) {
          throw new Error("All fields are required");
        }

        const result = await prisma.product.create({
          data: {
            name: name,
            stock: stock,
            price: price,
            categoryId: categoryId,
            userId: user.id,
          },
        });

        res
          .status(201)
          .json({
            data: result,
            message: "Data product was created successfully",
          });
      } else {
        console.error("User Id not found");
      }
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ Error: { message: error.message } });
    }
  }

  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, stock, price, categoryId } = req.body as ProductRequestBody;

      if (!name || !categoryId ) {
        throw new Error("All fields are required");
      }

      const result = await prisma.product.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name: name,
          stock: stock,
          price: price,
          categoryId: categoryId,
        },
      });

      res
        .status(201)
        .json({
          data: result,
          message: "Data product was update succjessfully",
        });
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

  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await prisma.product.delete({
        where: {
          id: Number(req.params.id),
        },
      });

      res.status(200).json({ data: "Product has been successfully deleted" });
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
}
