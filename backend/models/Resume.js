import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    contentScore: {
      type: Number,
      default: 0,
    },

    keywordScore: {
      type: Number,
      default: 0,
    },

    formattingScore: {
      type: Number,
      default: 0,
    },

    skills: [
      {
        type: String,
      },
    ],

    missingSkills: [
      {
        type: String,
      },
    ],

    recommendations: [
      {
        title: String,
        description: String,
        priority: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model("Resume", resumeSchema);