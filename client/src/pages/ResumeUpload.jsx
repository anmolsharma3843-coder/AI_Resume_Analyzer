import React, { useState } from "react";
import { FiUploadCloud, FiZap } from "react-icons/fi";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file || !jobDescription) {
      setError("Please upload a resume and enter job description!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("http://localhost:5000/api/resumes/analyze", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to analyze resume");

      setAnalysis(data.data);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">
        AI Resume Analyzer
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Upload your resume and paste the job description
      </p>

      {/* Resume Upload */}
      <label
        htmlFor="resume"
        className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 group-hover:scale-110 transition">
          <FiUploadCloud size={30} />
        </div>
        <p className="mt-3 text-sm font-medium text-gray-700">
          {file ? file.name : "Drop your resume here"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          or click to browse from your computer
        </p>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFile}
          className="hidden"
        />
      </label>

      {file && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {/* Job Description Input */}
      <textarea
        placeholder="Paste job description here..."
        className="mt-6 border rounded-xl p-3 w-full h-32 focus:ring-2 focus:ring-indigo-400 outline-none"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || !jobDescription || loading}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiZap />
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Analysis Result */}
      {analysis && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            Analysis Result
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>ATS Score:</strong> {analysis.score}</li>
            <li><strong>Matched Skills:</strong> {analysis.matchedRequirements?.join(", ")}</li>
            <li><strong>Missing Skills:</strong> {analysis.missingRequirements?.join(", ")}</li>
            <li><strong>Strengths:</strong> {analysis.strengths?.join(" | ")}</li>
            <li><strong>Weaknesses:</strong> {analysis.weaknesses?.join(" | ")}</li>
            <li><strong>Suggestions:</strong> {analysis.suggestions?.join(" | ")}</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default ResumeUpload;


/*Roles and Responsibilities :

    Design, develop, test, and deploy scalable React JS applications using Redux or MobX.
    Collaborate with cross-functional teams to identify requirements and implement solutions.
    Ensure high-quality code by writing unit tests and following best practices for coding standards.
    Participate in code reviews to improve the overall quality of the application.
    Troubleshoot issues related to frontend development.

Job Requirements

    Strong understanding of HTML5, CSS3, JavaScript (ES6+), jQuery, Bootstrap, AJAX, ASP.NET Core MVC/ASP.Net.
    Experience working on Git repositories and familiarity with GitHub workflows.
    Bachelor's degree in Computer Science or related field; Master's degree preferred */