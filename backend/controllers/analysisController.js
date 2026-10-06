
import fs from "fs";
import { Resume } from "../models/Resume.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume file is required" });
    }

    const dataBuffer = fs.readFileSync(req.file.path); // or req.file.buffer
    const pdfData = await pdfParse(dataBuffer);
    const pdfText = pdfData.text;

    console.log("Extracted text:", pdfText);

    res.json({ success: true, text: pdfText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to parse PDF", error: error.message });
  }
};




export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(
      req.params.id
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};

