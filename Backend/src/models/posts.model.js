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
    altText: {
      type: String,
      trim: true,
      maxlength: 50,
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
    postViewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

postSchema.index({ userId: 1, createdAt: -1 }); // Compound index for efficient querying of posts by user and creation time
postSchema.index({ createdAt: -1 }); // Index for global feed sorting
postSchema.index({ mediaType: 1, userId: 1 }); // Index for profile type-filtering queries

const Post = mongoose.model("posts", postSchema);

export default Post;
