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
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", (req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("welcome to LookSphere backend");
});

// Simple ping endpoint for uptime robot to keep server alive
app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Server is alive"
  });
});

// Health check endpoint for Render monitoring
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  const healthStatus = {
    status: dbStatus === 1 ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    database: statusMap[dbStatus] || 'unknown',
    uptime: process.uptime()
  };
  
  const statusCode = dbStatus === 1 ? 200 : 503;
  res.status(statusCode).json(healthStatus);
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

// Setup basic error handlers
setupErrorHandlers(app);

const PORT = process.env.PORT || 5000;

// Start server with error handling
startServerWithErrorHandling(app, PORT);
