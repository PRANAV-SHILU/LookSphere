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
    counts: {
      spark: { type: Number, default: 0 },
      archive: { type: Number, default: 0 },
      reshare: { type: Number, default: 0 },
      comment: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

postSchema.index({ createdAt: -1 });
postSchema.index({ userId: 1, mediaType: 1, createdAt: -1 });

// on cascade delete — delete all interactions when a post is deleted
postSchema.pre("deleteOne", { document: true, query: false }, async function () {
  await mongoose.model("interactions").deleteMany({ postId: this._id });
});

const Post = mongoose.model("posts", postSchema);

export default Post;
