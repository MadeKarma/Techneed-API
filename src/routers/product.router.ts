import { Router } from "express";

import ProductController from "../controllers/product.controller";
import { auth } from "../middleware/auth";


const router = Router();

router.get("/products", auth, ProductController.getProducts);
router.get("/product/:id", auth, ProductController.getProductById);
router.post("/product/add", auth, ProductController.addProduct);
router.put("/product/:id/update", auth, ProductController.updateProduct);
router.delete("/product/:id/delete", auth, ProductController.deleteProduct);

export default router;
