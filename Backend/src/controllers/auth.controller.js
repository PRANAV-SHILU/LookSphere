import { validationResult } from "express-validator";
import User from "../models/users.model.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists)
      return res.status(400).json({ msg: "Username already exists" });

    const newUser = await User.create({
      username,
      email,
      hashedPassword: password,
    });

    // Exclude hashedPassword from response — never send it to the client
    const { hashedPassword, ...userData } = newUser.toObject();

    res.status(201).json({ success: true, data: userData });
  } catch (err) {
    res.status(500).json({ error: `Internal server error - ${err.message}` });
  }
}

export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword)
      return res.status(400).json({ msg: "Invalid password" });

    // Generate JWT Token
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
    );
    console.log("JWT Token", token);

    // set token to cookie
    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const { hashedPassword, ...userData } = user.toObject();
    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    res.status(500).json({ error: `Internal server error - ${err.message}` });
  }
}
