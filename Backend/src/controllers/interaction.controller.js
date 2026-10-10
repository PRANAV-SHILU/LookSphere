import interaction from "../models/interaction.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getInteractionByUserId = asyncHandler(
  "getInteractionByUserId",
  (req, res) => {
    const userId = req.params.userId;
    const currentUserId = req.user.userId;
    const { action } = req.query;

    // check this proerply
    if (action != "repost" && userId != currentUserId)
      return res.status(401).status("unauthorize access");

    // .populate("poster-userId", "username, profileImage, posturl"); for each post
    const data = interaction.find({ userId, action });

    return res.status(200).json({ success: true });
  },
);

export const getInteractionByPostId = asyncHandler(
  "getInteractionByPostId",
  (req, res) => {
    const postId = req.params.postId;
    const { action } = req.query;

    // .populate("userId", "username profileImage"); for each user
    const data = interaction.find({ postId, action });

    return res.status(200).json({ success: true });
  },
);

export const addInteraction = asyncHandler("addInteraction", (req, res) => {
  const userId = req.user.userId;
  const { postId, action } = req.body;

  const isExists = interaction.findOne({ userId, postId, action });

  if (isExists) {
    interaction.deleteOne(isExists);
    return res.status(200).json({
      message: `post un${action} successfully.`,
      success: true,
    });
  }

  interaction.insertOne({ userId, postId, action });
  return res
    .status(200)
    .json({ message: `post ${action} successfully.`, success: true });
});
