import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();


// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/analysis", analysisRoutes);
app.use("/api/auth", authRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume AI API is running",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
