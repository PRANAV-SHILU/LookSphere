import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyToken, verifyTokenOptional } from "../middlewares/auth.middleware.js";
import { upload, checkMediaSize, uploadToCloudinaryMiddleware } from "../middlewares/upload.middleware.js";

import { updateProfileValidation } from "../validators/user.validator.js";

const userRoutes = express.Router();


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
  uploadToCloudinaryMiddleware("uploads/profile-image"),
  updateProfileValidation,
  updateProfile,
);

export default userRoutes;
