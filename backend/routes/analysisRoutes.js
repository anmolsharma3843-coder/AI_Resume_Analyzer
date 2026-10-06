import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
  analyzeResume,
  getAllResumes,
  getResumeById,
  deleteResume,
} from "../controllers/resumeController.js";

const router = express.Router();


// ===============================
// Upload + Analyze Resume
// ===============================

router.post(
  "/analyze",
  upload.single("resume"),
  analyzeResume
);


// ===============================
// Get All Resumes
// ===============================

router.get(
  "/",
  getAllResumes
);


// ===============================
// Get Single Resume
// ===============================

router.get(
  "/:id",
  getResumeById
);


// ===============================
// Delete Resume
// ===============================

router.delete(
  "/:id",
  deleteResume
);


export default router;