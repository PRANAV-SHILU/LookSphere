import User from "../models/users.model.js";
import Post from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const getUsers = asyncHandler("getUsers", async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } })
    .select({
      profileImage: 1,
      username: 1,
      tagline: 1,
      profileViewCount: 1,
      postCount: 1,
    })
    .sort({ profileViewCount: -1 });

  return res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
});

export const getProfile = asyncHandler("getProfile", async (req, res) => {
  const targetUsername = req.params.username || req.user?.username;

  if (!targetUsername) {
    return res.status(400).json({ message: "Username is required" });
  }

  const isOwnProfile = req.user && req.user.username === targetUsername;

  let user;
  if (isOwnProfile) {
    user = await User.findOne({ username: targetUsername })
      .select({ hashedPassword: 0 })
      .lean();
  } else {
    user = await User.findOneAndUpdate(
      { username: targetUsername, role: { $ne: "Admin" } },
      { $inc: { profileViewCount: 1 } },
      { returnDocument: "after" },
    )
      .select({ hashedPassword: 0, email: 0 })
      .lean();
  }

  if (!user) return res.status(404).json({ message: "User not found" });

  const images = await Post.find({
    $and: [{ userId: user._id }, { mediaType: "Image" }],
  }).sort({
    createdAt: -1,
  });

  const videos = await Post.find({
    $and: [{ userId: user._id }, { mediaType: "Video" }],
  }).sort({
    createdAt: -1,
  });

  const [viewCountResult] = await Post.aggregate([
    { $match: { userId: user._id } },
    { $group: { _id: null, totalViews: { $sum: "$postViewCount" } } },
  ]);
  user.totalPostViews = viewCountResult?.totalViews || 0;

  return res.status(200).json({
    message: "Profile fetched successfully",
    data: { user, images, videos },
  });
});

export const updateProfile = asyncHandler("updateProfile", async (req, res) => {
  const { username, email, tagline, bio } = req.body;
  const updateData = {};

  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.cloudinaryUrl:", req.cloudinaryUrl);
  console.log("req.user:", req.user);

  if (username) {
    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists)
      return res.status(400).json({ message: "Username already exists" });
    updateData.username = username;
  }
  if (email) updateData.email = email;
  if (tagline !== undefined) updateData.tagline = tagline;
  if (bio !== undefined) updateData.bio = bio;

  if (req.cloudinaryUrl) {
    updateData.profileImage = req.cloudinaryUrl;
  }

  const updatedUser = await User.findOneAndUpdate(
    { username: req.user.username },
    { $set: updateData },
    { returnDocument: "after", runValidators: true },
  ).select("-hashedPassword");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  // If the username changed, we MUST issue a new JWT because the old JWT
  // has the old username inside it, which will break future requests.
  if (username && username !== req.user.username) {
    const newToken = jwt.sign(
      {
        username: updatedUser.username,
        userId: updatedUser._id,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1y" },
    );

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
      token: newToken,
    });
  }

  return res.status(200).json({
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

