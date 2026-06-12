import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/users.model.js";
import Post from "../models/posts.model.js";

export const getMatrics = asyncHandler("getMatrics", async (req, res) => {
  // Find total users count
  const totalUsersCount = await User.countDocuments();

  // Find total post count
  const totalPostCount = await Post.countDocuments();

  // Find total image and video count
  const totalImageCount = await Post.countDocuments({ mediaType: "Image" });
  const totalVideoCount = await Post.countDocuments({ mediaType: "Video" });

  // Find all users who are not admin, sorted by createdAt descending
  const usersRaw = await User.find(
    { role: { $ne: "admin" } },
    "username email profileImage profileViewCount createdAt postCount",
  )
    .sort({ createdAt: -1 })
    .lean();

  const userList = usersRaw.map((u) => ({
    ...u,
    avatar: u.profileImage,
  }));

  // Recent users — registered in the last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const recentUsersRaw = await User.find(
    { role: { $ne: "admin" }, createdAt: { $gte: sevenDaysAgo } },
    "username email profileImage profileViewCount createdAt postCount",
  )
    .sort({ createdAt: -1 })
    .lean();

  const recentUsers = recentUsersRaw.map((u) => ({
    ...u,
    avatar: u.profileImage,
  }));

  // Latest posts — created in the last 7 days
  const latestPosts = await Post.find(
    { createdAt: { $gte: sevenDaysAgo } },
    "userId mediaUrl mediaType caption postViewCount createdAt altText",
  )
    .sort({ createdAt: -1 })
    .populate("userId", "username profileImage")
    .lean();

  res.status(200).json({
    success: true,
    data: {
      totalUsersCount,
      totalPostCount,
      totalImageCount,
      totalVideoCount,
      userList,
      recentUsers,
      latestPosts,
    },
  });
});

