import User from "../models/users.model.js";
import Post from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsers = asyncHandler("getUsers", async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } })
    .select({
      profileImage: 1,
      username: 1,
      tagline: 1,
      profileViewCount: 1,
    })
    .sort({ profileViewCount: -1 });

  return res.status(200).json({
    message: "Users fetched successfully",
    data: users,
  });
});

export const getOwnProfile = asyncHandler("getOwnProfile", async (req, res) => {
  const user = await User.findOne(
    { username: req.user.username },
    { hashedPassword: 0 },
  ).lean();

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

export const getUserProfile = asyncHandler(
  "getUserProfile",
  async (req, res) => {
    const { username } = req.params;
    if (!username)
      return res.status(404).json({ message: "Username is required" });

    const user = await User.findOne({ username, role: { $ne: "Admin" } })
      .select({ hashedPassword: 0, email: 0 })
      .lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    await User.updateOne({ username }, { $inc: { profileViewCount: 1 } });
    user.profileViewCount += 1;

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
  },
);

export const updateProfile = asyncHandler("updateProfile", async (req, res) => {
  // logic here
});
