import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false },
);

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
