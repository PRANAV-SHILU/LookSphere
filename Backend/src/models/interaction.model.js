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

    //action
    action: {
      type: String,
      required: true,
      enum: ["like", "save", "repost"],
    },
  },
  { timestamps: true, versionKey: false }, // why version key - also contact model
);

interactionSchema.index({ userId: 1, postId: 1, action: 1 }, { unique: true });

// on casecade delete

const interaction = mongoose.model("interaction", interactionSchema);
export default interaction;
