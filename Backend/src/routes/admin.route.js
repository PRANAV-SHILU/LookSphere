import express from "express";
import { getMatrics } from "../controllers/admin.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/matrics", verifyToken, isAdmin, getMatrics);

export default router;
