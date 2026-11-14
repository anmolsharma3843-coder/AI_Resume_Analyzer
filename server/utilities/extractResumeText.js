import fs from "fs";
import pdfParse from "pdf-parse-fork";
import mammoth from "mammoth";

export const extractResumeText = async (file) => {
  let resumeText = "";

  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer); // ✅ works in ESM
    resumeText = pdfData.text;
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docxBuffer = fs.readFileSync(file.path);
    const { value } = await mammoth.extractRawText({ buffer: docxBuffer });
    resumeText = value;
  } else {
    throw new Error("Unsupported file type. Only PDF and DOCX are allowed.");
  }

  return resumeText;
};
