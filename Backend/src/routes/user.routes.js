import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
  getUserDetail,
} from "../controllers/user.controller.js";
import { verifyToken, verifyTokenOptional } from "../middlewares/auth.middleware.js";
import { upload, checkMediaSize, uploadToCloudinaryMiddleware } from "../middlewares/upload.middleware.js";

import { updateProfileValidation } from "../validators/user.validator.js";

const userRoutes = express.Router();

// get user detail (username and avatar only)
userRoutes.get("/:id/detail", getUserDetail);

// get users list
userRoutes.get("/", getUsers);


userRoutes.get("/profile", verifyToken, getProfile);
userRoutes.get("/profile/:username", verifyTokenOptional, getProfile);

// edit profile
userRoutes.patch(
  "/profile",
  verifyToken,
  upload.single("profileImage"),
  checkMediaSize,
  uploadToCloudinaryMiddleware,
  updateProfileValidation,
  updateProfile,
);

export default userRoutes;
