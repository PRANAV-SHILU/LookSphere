import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {upload,checkMediaSize } from "../middlewares/upload.middleware.js";

const postRoutes = express.Router();

// get all posts from all users - for feed
postRoutes.get("/", getPosts);

// get specific post
postRoutes.get("/:id", getPost);

// add post
postRoutes.post("/", verifyToken, checkMediaSize, upload.single("media"), createPost);

// delete post
postRoutes.delete("/:id", verifyToken, deletePost);

export default postRoutes;
