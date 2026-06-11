import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Post from "../models/posts.model.js"

export const getPosts = asyncHandler("getPosts", async (req, res) => {
  // logic here
});

export const getPost = asyncHandler("getPost", async (req, res) => {
  // logic here
});

export const createPost = asyncHandler("createPost", async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No media uploaded" });

  const { mediaType, altText, caption } = req.body;
  const userId = req.user.userId;
  const mediaUrl = req.cloudinaryUrl;

  const newPost = await Post.create({
    userId,
    mediaUrl,
    mediaType,
    altText,
    caption,
  });

  await User.updateOne(
    { username: req.user.username },
    { $inc: { postCount: 1 } },
  );

  return res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
});

export const deletePost = asyncHandler("deletePost", async (req, res) => {
  // TODO: delete post from DB and cloud storage
  // After deleting the post, decrement the user's postCount:
  await User.updateOne(
    { username: req.user.username },
    { $inc: { postCount: -1 } },
  );
});

export const getUserPosts = asyncHandler("getUserPosts", async (req, res) => {
  // logic here
});
