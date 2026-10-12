import interaction from "../models/interaction.model.js";
import Post from "../models/posts.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getInteractionByUserId = asyncHandler(
  "getInteractionByUserId",
  async (req, res) => {
    const { userId } = req.params;
    const { action } = req.query;
    const currentUserId = req.user?.userId;

    // spark and archive are private — only the owner can view them
    if (action === "spark" || action === "archive") {
      if (!currentUserId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required to view private interactions.",
        });
      }
      if (userId.toString() !== currentUserId.toString()) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to view another user's private interactions.",
        });
      }
    }

    const data = await interaction
      .find({ userId, action })
      .sort({ createdAt: -1 })
      .populate({
        path: "postId",
        select: "mediaUrl mediaType caption altText userId createdAt",
        populate: { path: "userId", select: "username profileImage" },
      });

    return res.status(200).json({
      success: true,
      total: data.length,
      data,
    });
  },
);

export const getInteractionByPostId = asyncHandler(
  "getInteractionByPostId",
  async (req, res) => {
    const { postId } = req.params;
    const { action } = req.query;

    const data = await interaction
      .find({ postId, action })
      .sort({ createdAt: -1 })
      .populate("userId", "username profileImage");

    return res.status(200).json({
      success: true,
      total: data.length,
      data,
    });
  },
);

export const addInteraction = asyncHandler(
  "addInteraction",
  async (req, res) => {
    const userId = req.user.userId;
    const { postId, action } = req.body;

    const existingInteraction = await interaction.findOne({
      userId,
      postId,
      action,
    });

    if (existingInteraction) {
      await existingInteraction.deleteOne();
      await Post.findByIdAndUpdate(postId, {
        $inc: { [`counts.${action}`]: -1 },
      });
      return res.status(200).json({ success: true, action: "removed" });
    }

    await interaction.create({
      userId,
      postId,
      action,
    });

    await Post.findByIdAndUpdate(postId, {
      $inc: { [`counts.${action}`]: 1 },
    });

    return res.status(201).json({
      success: true,
      action: "added",
    });
  },
);
