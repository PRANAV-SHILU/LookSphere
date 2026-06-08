import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const postRoutes = express.Router();

// get all posts from all users - for feed
postRoutes.get("/", getPosts);

// get specific post
postRoutes.get("/:id", getPost);

// add post
postRoutes.post("/", auth, upload.single("media"), createPost);

// delete post
postRoutes.delete("/:id", auth, deletePost);

export default postRoutes;
