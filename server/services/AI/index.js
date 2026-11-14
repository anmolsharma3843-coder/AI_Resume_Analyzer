import { analyzeWithMock } from "./mockAi.js";
import { analyzeWithGemini } from "./gemini.js";
export async function analyzeResumeAI(input) {
  const provider = process.env.AI_PROVIDER || "mock";

  switch (provider) {
    case "mock":
      return analyzeWithMock(input);

    case "gemini":
      return analyzeWithGemini(input);

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}