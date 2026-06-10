import User from "../models/users.model.js";
import Post from "../models/posts.model.js";

export async function getUsers(req, res) {}

export async function getOwnProfile(req, res) {
  try {
    const user = await User.findOne({ username: req.user.username }, { hashedPassword: 0 }).lean();

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
      { $group: { _id: null, totalViews: { $sum: "$postViewCount" } } }
    ]);
    user.totalPostViews = viewCountResult?.totalViews || 0;

    return res.status(200).json({
      message: "Profile fetched successfully",
      data: { user, images, videos },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getUserProfile(req, res) {}

export async function updateProfile(req, res) {}
