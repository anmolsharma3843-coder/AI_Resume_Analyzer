
import { GoogleGenAI } from "@google/genai";

export async function analyzeWithGemini({
  resumeText,
  jobDescription,
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Check your backend .env file."
    );
  }

  if (!resumeText?.trim() || !jobDescription?.trim()) {
    throw new Error("Resume text and job description are required.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Limit unnecessary input while preserving useful information.
  const cleanResume = resumeText.slice(0, 16000);
  const cleanJobDescription = jobDescription.slice(0, 10000);

  const prompt = `
You are a fast and accurate resume analyzer.

Compare the resume with the job description.

RESUME:
${cleanResume}

JOB DESCRIPTION:
${cleanJobDescription}

TASK:
1. Extract up to 12 important requirements dynamically from the job description.
2. Compare each requirement with actual resume evidence.
3. Do not invent skills, qualifications or experience.
4. Keep evidence and recommendations short (maximum 20 words each).
5. Use only these statuses:
   met, partially_met, missing, unclear.

SCORING:
met = 1
partially_met = 0.5
missing = 0
unclear = 0

score = (earned points / total requirements) * 100.
Round the score to a whole number.

OUTPUT LIMITS:
- Maximum 12 requirements.
- Maximum 4 strengths.
- Maximum 4 weaknesses.
- Maximum 5 suggestions.
- Keep summary under 50 words.
- Do not repeat the same information unnecessarily.

Return ONLY valid JSON using this exact structure:

{
  "score": 0,
  "summary": "",
  "requirements": [
    {
      "requirement": "",
      "category": "skill",
      "status": "met",
      "evidence": "",
      "recommendation": ""
    }
  ],
  "matchedRequirements": [],
  "partialRequirements": [],
  "missingRequirements": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

ALLOWED CATEGORIES:
skill, experience, education, responsibility,
certification, soft_skill, other.

IMPORTANT:
- The three requirement arrays must contain strings.
- matchedRequirements must contain requirements with status met.
- partialRequirements must contain requirements with status partially_met.
- missingRequirements must contain requirements with status missing.
- Do not include markdown or explanations outside JSON.
`;

  console.time("Gemini API");

  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        thinkingConfig: {
          thinkingLevel: "low",
        },
      },
    });

    console.timeEnd("Gemini API");

    const responseText = response.text;

    console.log("Gemini token usage:", response.usageMetadata);

    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    let result;

    try {
      result = JSON.parse(responseText);
    } catch {
      throw new Error("Gemini returned invalid JSON.");
    }

    return result;
  } catch (error) {
    console.error("Gemini analysis failed:", error.message);
    throw error;
  }
}
