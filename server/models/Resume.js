import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    // Resume owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Original uploaded filename
    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    // Uploaded file format
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },

    // File size in bytes
    fileSize: {
      type: Number,
      required: true,
      min: 1,
    },

    // Extracted resume content
    extractedText: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return value.length > 0 && value.length <= 1000000;
        },
        message: "Resume text must be between 1 and 1,000,000 characters.",
      },
    },

    // Optional storage location if original files are stored externally
    fileUrl: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional storage identifier for deleting the uploaded file
    storageId: {
      type: String,
      default: "",
      trim: true,
    },

    // Processing status
    status: {
      type: String,
      enum: ["uploaded", "processed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Efficient user-specific resume history
resumeSchema.index({ user: 1, createdAt: -1 });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;