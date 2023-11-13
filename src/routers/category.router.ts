import { Router } from "express";

import { auth } from "../middleware/auth";
import CategoryController from '../controllers/category.controller';


const router = Router();

router.get("/categories", auth, CategoryController.getCategories);
router.get("/category/:id", auth, CategoryController.getCategoryById);
router.post("/category/add", auth, CategoryController.addCategory);
router.put("/category/:id/update", auth, CategoryController.updateCategory);
router.delete("/category/:id/delete", auth, CategoryController.deleteCategory);

export default router;
