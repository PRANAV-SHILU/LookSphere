import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "general",
        "feedback",
        "suggestion",
        "issue",
        "security",
        "inquiry",
      ],
    },
    message: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    response: {
      type: String,
      default: "",
      maxlength: 1000,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: undefined,
    },
    video: {
      type: String,
    },
  },
  { timestamps: true },
);


const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
