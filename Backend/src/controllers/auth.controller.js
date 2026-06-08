import { validationResult } from "express-validator";
import User from "../models/users.model.js";

export async function register(req, res) {
  console.log("register", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists)
      return res.status(400).json({ msg: "Username already exists" });

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists)
      return res.status(400).json({ msg: "Email already exists" });

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

  res.send("success");
}
