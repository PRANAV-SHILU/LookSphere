import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["Image", "Video"],
      required: true,
    },
    caption: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

postSchema.index({ userId: 1, createdAt: -1 }); // Compound index for efficient querying of posts by user and creation time

const Post = mongoose.model("posts", postSchema);

export default Post;
