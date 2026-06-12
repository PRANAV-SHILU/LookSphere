import express from "express";
import {
  getUsers,
  getOwnProfile,
  getUserProfile,
  updateProfile,
  getUserDetail,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload, checkMediaSize, uploadToCloudinaryMiddleware } from "../middlewares/upload.middleware.js";

import { updateProfileValidation } from "../validators/user.validator.js";

const userRoutes = express.Router();

// get user detail (username and avatar only)
userRoutes.get("/:id/detail", getUserDetail);

// get users list
userRoutes.get("/", getUsers);

// get own profile
userRoutes.get("/profile", verifyToken, getOwnProfile);

// get other user's profile
userRoutes.get("/profile/:username", getUserProfile);

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
