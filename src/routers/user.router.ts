import { Router } from "express";

import UserController from "../controllers/user.controller";
import { auth, authorizeAdmin } from "../middleware/auth";


const router = Router();

router.get('/users', auth, authorizeAdmin, UserController.getUsers);
router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router