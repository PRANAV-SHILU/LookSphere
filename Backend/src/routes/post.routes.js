import express from "express";
import {
  createPost,
  getFeed,
  increasePostImpression,
  editPost,
  getPostById,
} from "../controllers/post.controller.js";
import { verifyToken, verifyTokenOptional } from "../middlewares/auth.middleware.js";
import {
  upload,
  checkMediaSize,
  uploadToCloudinaryMiddleware,
} from "../middlewares/upload.middleware.js";
import { editPostValidation } from "../validators/post.validator.js";

const postRoutes = express.Router();

// get single post
postRoutes.get("/:id", verifyTokenOptional, getPostById);

// increase post impression count
postRoutes.patch("/:id/increment-impression", increasePostImpression);

// get all posts from all users - for feed
postRoutes.get("/", verifyTokenOptional, getFeed);

// add post
postRoutes.post(
  "/",
  verifyToken,
  upload.single("media"),
  checkMediaSize,
  uploadToCloudinaryMiddleware("uploads"),
  createPost,
);


// edit post
postRoutes.patch("/:id", verifyToken,editPostValidation, editPost);

export default postRoutes;

