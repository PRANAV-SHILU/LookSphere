import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  increasePostView,
  editPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  upload,
  checkMediaSize,
  uploadToCloudinaryMiddleware,
} from "../middlewares/upload.middleware.js";
import { editPostValidation } from "../validators/post.validator.js";

const postRoutes = express.Router();

// get all posts from all users - for feed - not used
postRoutes.get("/", getPosts);

// add post
postRoutes.post(
  "/",
  verifyToken,
  upload.single("media"),
  checkMediaSize,
  uploadToCloudinaryMiddleware,
  createPost,
);

// increase post view count
postRoutes.patch("/:id/views", increasePostView);

// edit post
postRoutes.patch("/:id", verifyToken,editPostValidation, editPost);

// delete post  - not used
postRoutes.delete("/:id", verifyToken, deletePost);

export default postRoutes;
