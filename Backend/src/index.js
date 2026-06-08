import connectDB from "./config/db.js";

import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

// Fix: Node.js's async DNS resolver fails on SRV lookups on some networks, Force it to use Google's public DNS which correctly handles mongodb+srv:// SRV records.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// neccesary middlewares and configurations
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to secureauth");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 404 handler - for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Path not found. Kindly check the URL or try again later!" });
});

// error handler
app.use((err, req, res, next) => {
  console.error("Express Error:", err);
  res.status(500).json({ error: "Internal server error. Kindly check backend logs or try again later!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
