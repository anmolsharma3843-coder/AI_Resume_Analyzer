
import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  analyzeResume,
  getAllResumes,
  getResumeById,
  deleteResume,
} from "../controllers/analysisController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload resume and analyze using Mock AI or Gemini
router.get(
  "/",
  isAuthenticated,
  getAllResumes
);
router.get(
  "/:id",
  isAuthenticated,
  getResumeById
);
router.post(
  "/analyze",
 isAuthenticated,
  upload.single("resume"),
  analyzeResume
);

// Get logged-in user's resume analysis history


// Get a single analysis belonging to the logged-in user


// Delete an analysis belonging to the logged-in user
router.delete(
  "/:id",
  isAuthenticated,
  deleteResume
);

export default router;
