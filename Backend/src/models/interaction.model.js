import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: ["like", "save", "repost"],
    },
  },
  { timestamps: true, versionKey: false },
);

// compound index to ensure only one interaction of each type per user per post
interactionSchema.index({ userId: 1, postId: 1, action: 1 }, { unique: true });
interactionSchema.index({ postId: 1, action: 1, createdAt: -1 });
interactionSchema.index({ userId: 1, action: 1, createdAt: -1 });

const interaction = mongoose.model("interactions", interactionSchema);
export default interaction;
