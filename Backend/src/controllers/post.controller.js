import User from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Post from "../models/posts.model.js";

// not used
export const getPosts = asyncHandler("getPosts", async (req, res) => {
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

// delete post  - not used
export const deletePost = asyncHandler("deletePost", async (req, res) => {
  // TODO: delete post from DB and cloud storage
  // After deleting the post, decrement the user's postCount:
  await User.updateOne(
    { username: req.user.username },
    { $inc: { postCount: -1 } },
  );
});

export const increasePostView = asyncHandler(
  "increasePostView",
  async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { postViewCount: 1 } },
      { returnDocument: "after" },
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      message: "Post view increased successfully",
      data: post,
    });
  },
);

export const editPost = asyncHandler("editPost", async (req, res) => {
  const { id } = req.params;
  const { caption, altText } = req.body;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.userId.toString() !== req.user.userId)
    return res.status(403).json({ message: "Unauthorized request" });

  if (caption !== undefined && caption !== post.caption) post.caption = caption;
  if (altText !== undefined && altText !== post.altText) post.altText = altText;

  const updatedPost = await post.save();

  return res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});
