import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import resumeRoutes from "./routes/analysisRoutes.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();



// ===============================
// Database
// ===============================

connectDB();


// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// ===============================
// Static uploads
// ===============================




// ===============================
// Routes
// ===============================

// app.use(
//   "/api/resumes",
//   analysisRoutes
// );


// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume AI API is running",
  });
});
app.use("/api/auth", authRoutes);



// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});


// ===============================
// Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});