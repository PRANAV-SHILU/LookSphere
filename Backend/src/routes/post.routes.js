import express from "express";
import {
  createPost,
  getFeed,
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

// get all posts from all users - for feed
postRoutes.get("/", getFeed);

// add post
postRoutes.post(
  "/",
  verifyToken,
  upload.single("media"),
  checkMediaSize,
  uploadToCloudinaryMiddleware("uploads"),
  createPost,
);

// increase post view count
postRoutes.patch("/:id/increment-view", increasePostView);

// edit post
postRoutes.patch("/:id", verifyToken,editPostValidation, editPost);

export default postRoutes;

