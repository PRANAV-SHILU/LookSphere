import { validationResult } from "express-validator";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler("register", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  const isUsernameExists = await User.findOne({ username });
  if (isUsernameExists)
    return res.status(400).json({ message: "Username already exists" });

  const newUser = await User.create({
    username,
    email,
    hashedPassword: password,
  });

  // Exclude hashedPassword from response — never send it to the client
  const { hashedPassword, ...userData } = newUser.toObject();

  res.status(201).json({ success: true, data: userData });
});

export const login = asyncHandler("login", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword)
    return res.status(400).json({ message: "Invalid password" });

  // Generate JWT Token
  const token = jwt.sign(
    { username: user.username, userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1y" },
  );
  console.log("JWT Token", token);

  const { hashedPassword, ...userData } = user.toObject();
  res.status(200).json({ success: true, data: userData, token });
});

export const logout = asyncHandler("logout", async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
