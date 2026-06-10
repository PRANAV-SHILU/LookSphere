import { asyncHandler } from "../utils/asyncHandler.js";

export const getPosts = asyncHandler("getPosts", async (req, res) => {
  // logic here
});

export const getPost = asyncHandler("getPost", async (req, res) => {
  // logic here
});

export const createPost = asyncHandler("createPost", async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No media uploaded" });
});

export const deletePost = asyncHandler("deletePost", async (req, res) => {
  // logic here
});

export const getUserPosts = asyncHandler("getUserPosts", async (req, res) => {
  // logic here
});
