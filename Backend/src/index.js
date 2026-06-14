import connectDB from "./config/db.js";

import express from "express";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import cors from "cors";
import dns from "dns";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import adminRoutes from "./routes/admin.route.js";
import { setupErrorHandlers, startServerWithErrorHandling, retryWithBackoff } from "./utils/errorHandler.js";

// Fix: Node.js's async DNS resolver fails on SRV lookups on some networks, Force it to use Google's public DNS which correctly handles mongodb+srv:// SRV records.
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// neccesary middlewares and configurations
dotenv.config();

// Connect DB with retry logic
retryWithBackoff(() => connectDB(), 5, 5000, "Database connection");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", (req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to secureauth");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin",adminRoutes)

// 404 handler - for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    error: "Path not found. Kindly check the URL or try again later!",
  });
});

// Setup comprehensive error handlers
setupErrorHandlers(app);

// Start server with error handling
startServerWithErrorHandling(app, process.env.PORT);
