
import mongoose from "mongoose";

import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";

import {
  analyzeResumeAI as runAIAnalysis,
} from "../services/AI/index.js";

import { extractResumeText } from "../utilities/extractResumeText.js";

// ==========================================
// 1. Upload Resume + Analyze + Save
// ==========================================

export const analyzeResume = async (req, res, next) => {
  let savedResume = null;

  try {
    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    // Check job description
    const { jobDescription } = req.body;

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    // Get authenticated user ID
     const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in to analyze a resume.",
      });
    }

    // Extract PDF/DOCX text
    const resumeText = await extractResumeText(req.file);

    if (
      typeof resumeText !== "string" ||
      !resumeText.trim()
    ) {
      return res.status(422).json({
        success: false,
        message: "Could not extract readable text from the resume.",
      });
    }

    // Run AI analysis
    const result = await runAIAnalysis({
      resumeText,
      jobDescription: jobDescription.trim(),
    });

    // Validate basic AI response
    if (
      !result ||
      !Number.isFinite(result.score) ||
      result.score < 0 ||
      result.score > 100 ||
      typeof result.summary !== "string" ||
      !Array.isArray(result.requirements)
    ) {
      const error = new Error("AI returned an invalid analysis response.");
      error.statusCode = 502;
      throw error;
    }

    // Save uploaded resume in resumes collection
    const extension = req.file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    savedResume = await Resume.create({
      user: userId,
      originalName: req.file.originalname,
      fileType: extension,
      fileSize: req.file.size,
      extractedText: resumeText,
    });

    // Save AI result in analyses collection
    const savedAnalysis = await Analysis.create({
      user: userId,

      // Connect analysis to uploaded resume
      resume: savedResume._id,

      resumeFileName: req.file.originalname,

      jobDescription: jobDescription.trim(),

      score: result.score,
      summary: result.summary,

      requirements: result.requirements || [],

      matchedRequirements:
        result.matchedRequirements || [],

      partialRequirements:
        result.partialRequirements || [],

      missingRequirements:
        result.missingRequirements || [],

      strengths: result.strengths || [],

      weaknesses: result.weaknesses || [],

      suggestions: result.suggestions || [],
    });

    return res.status(201).json({
      success: true,
      message: "Resume analyzed and saved successfully.",
      data: savedAnalysis,
    });

  } catch (error) {
    // Remove uploaded resume if analysis saving failed
    if (savedResume) {
      await Resume.deleteOne({
        _id: savedResume._id,
        user: req.userId,
      }).catch((cleanupError) => {
        console.error("Resume cleanup error:", cleanupError);
      });
    }

    next(error);
  }
};


// ==========================================
// 2. Get Logged-in User's Analysis History
// ==========================================

export const getAllResumes = async (req, res, next) => {
  try {
  
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    const analyses = await Analysis.find({
      user: userId,
    })
      .select("-jobDescription")
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// 3. Get Single Analysis By ID
// ==========================================

export const getResumeById = async (req, res, next) => {
  try {
     const userId = req.user.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid analysis ID.",
      });
    }

    const analysis = await Analysis.findOne({
      _id: id,
      user: userId,
    }).populate(
      "resume",
      "originalName fileType fileSize"
    );

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Resume analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: analysis,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// 4. Delete Analysis By ID
// ==========================================

export const deleteResume = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please log in first.",
      });
    }

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid analysis ID.",
      });
    }

    const analysis = await Analysis.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Resume analysis not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume analysis deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};
