import express from 'express';
import { register, login } from '../controllers/auth.controller.js';

const router = express.Router();

router.route("/register").post(register);
router.post("/login", login);

export const UserRoutes = router;
