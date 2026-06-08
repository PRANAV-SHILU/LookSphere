import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerValidation, register);
authRoutes.post("/login", loginValidation, login);

export default authRoutes;
