import { Router } from "express";

import ProductRouter from "./product.router";
import CategoryRouter from "./category.router";
import UserRouter from "./user.router";


const router = Router()

router.use(ProductRouter)
router.use(CategoryRouter)
router.use(UserRouter)

export default router