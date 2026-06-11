import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getPosts = asyncHandler("getPosts", async (req, res) => {
  // logic here
});

export const getPost = asyncHandler("getPost", async (req, res) => {
  // logic here
});

export const createPost = asyncHandler("createPost", async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No media uploaded" });

  // TODO: save post to DB, upload to cloud, etc.
  // After saving the post, increment the user's postCount:
  await User.updateOne({ username: req.user.username }, { $inc: { postCount: 1 } });
});

export const deletePost = asyncHandler("deletePost", async (req, res) => {
  // TODO: delete post from DB and cloud storage
  // After deleting the post, decrement the user's postCount:
  await User.updateOne({ username: req.user.username }, { $inc: { postCount: -1 } });
});

export const getUserPosts = asyncHandler("getUserPosts", async (req, res) => {
  // logic here
});
