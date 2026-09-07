import express from "express";
import {
  getUsers,
  getProfile,
  updateProfile,
  changePassword,
  changeEmail
} from "../controllers/user.controller.js";
import { verifyToken, verifyTokenOptional } from "../middlewares/auth.middleware.js";
import { upload, checkMediaSize, uploadToCloudinaryMiddleware } from "../middlewares/upload.middleware.js";

import { updateProfileValidation, changePasswordValidation, changeEmailSchema } from "../validators/user.validator.js";

const userRoutes = express.Router();


// get users list
userRoutes.get("/", getUsers);

// change password
userRoutes.patch("/change-password", verifyToken, changePasswordValidation, changePassword);

// change email
userRoutes.patch("/change-email",verifyToken,changeEmailSchema,changeEmail)


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
