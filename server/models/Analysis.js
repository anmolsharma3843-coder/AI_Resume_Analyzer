import mongoose from "mongoose";
const requirementSchema = new mongoose.Schema(
  {
    requirement: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "skill",
        "experience",
        "education",
        "responsibility",
        "certification",
        "soft_skill",
        "other",
      ],
      default: "other",
    },

    status: {
      type: String,
      enum: ["met", "partially_met", "missing", "unclear"],
      required: true,
    },

    evidence: {
      type: String,
      default: "",
      trim: true,
    },

    recommendation: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    resumeFileName: {
      type: String,
      default: "",
      trim: true,
      maxlength: 255,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50000,
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },
    requirements: {
      type: [requirementSchema],
      default: [],
    },
    matchedRequirements: {
      type: [String],
      default: [],
    },

    partialRequirements: {
      type: [String],
      default: [],
    },

    missingRequirements: {
      type: [String],
      default: [],
    },
    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    // AI processing metadata
    aiProvider: {
      type: String,
      default: "",
      trim: true,
    },

    aiModel: {
      type: String,
      default: "",
      trim: true,
    },

    // Analysis processing status
    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// User-specific analysis history
analysisSchema.index({ user: 1, createdAt: -1 });

// Resume-specific analysis history
analysisSchema.index({ resume: 1, createdAt: -1 });

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;