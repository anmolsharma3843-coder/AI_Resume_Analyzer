import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();


// ===============================
// ES Module __dirname
// ===============================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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


// ===============================
// Static uploads
// ===============================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ===============================
// Routes
// ===============================

app.use(
  "/api/resumes",
  resumeRoutes
);


// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume AI API is running",
  });
});


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