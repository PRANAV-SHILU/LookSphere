import express from "express";
import {
  getUsers,
  getOwnProfile,
  getUserProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const userRoutes = express.Router();

// get users list
userRoutes.get("/", getUsers);

// get own profile
userRoutes.get("/profile", auth, getOwnProfile);

// get other user's profile
userRoutes.get("/:username", getUserProfile);

// edit profile
userRoutes.patch(
  "/profile",
  auth,
  upload.single("profileImage"),
  updateProfileValidation,
  updateProfile,
);

export default userRoutes;
