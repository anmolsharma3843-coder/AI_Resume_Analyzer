import "dotenv/config";
import { analyzeWithGemini } from "./services/AI/gemini.js";

try {
  const result = await analyzeWithGemini({
    resumeText: `
      BCA graduate.
      Skills: JavaScript, React, Redux Toolkit,
      Node.js, Express.js, MongoDB, HTML, CSS.
      Project: UrbanMela e-commerce application.
    `,
    jobDescription: `
      We need a React developer with JavaScript,
      Redux, HTML, CSS, Git and unit testing experience.
    `,
  });

  console.log("Gemini API working!");
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error("Gemini API test failed:");
  console.error(error);
}