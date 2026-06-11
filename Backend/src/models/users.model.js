import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    tagline: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "INDIAN",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "Hey There! How is the JOSH? 🔥",
    },
    profileImage: {
      type: String,
      default: "",
    },
    profileViewCount: {
      type: Number,
      default: 0,
    },
    postCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

// Instance method to compare provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.hashedPassword);
};

// Pre-save hook to hash the password before saving the user document
userSchema.pre("save", async function () {
  if (this.isModified("hashedPassword")) {
    this.hashedPassword = await bcrypt.hash(this.hashedPassword, 12);
  }
});

const User = mongoose.model("users", userSchema);
export default User;

// explaination of isModified
// User.create({ hashedPassword: "abc123" })   ← plain text, isModified = true
//         ↓ pre("save") fires
// isModified("hashedPassword") → true         ← "yes it was set"
//         ↓
// bcrypt.hash("abc123", 10)                   ← NOW we hash it for the first time
//         ↓
// stores "$2b$10$..."  in DB                  ← bcrypt hash ✅
