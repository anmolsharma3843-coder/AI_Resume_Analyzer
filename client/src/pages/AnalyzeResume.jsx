import { useState } from "react";

import ResumeUploader from "../components/analysis/ResumeUploader";
import JobDescriptionInput from "../components/analysis/JobDescriptionInput";
import AnalyzeButton from "../components/analysis/AnalyzeButton";
import AnalysisResult from "../components/analysis/AnalysisResult";
import Login from "./Login";

import { analyzeResume } from "../services/analysisService";

export default function AnalyzeResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);
      setAnalysis(null);

      const result = await analyzeResume(file, jobDescription);
      setAnalysis(result);
    } catch (err) {
      if (
        err.message.includes("login") ||
        err.message.includes("Unauthorized")
      ) {
        setShowLogin(true);
        console.log(err);
      } else {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
            <span>✦</span>
            AI-POWERED RESUME ANALYSIS
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Make your next move
            <span className="text-indigo-600 dark:text-indigo-400">
              {" "}with confidence.
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-gray-400 sm:text-base">
            Upload your resume and compare it with a job description
            to identify matching requirements and opportunities to improve.
          </p>

        </header>

        {/* Analysis Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 sm:p-8"
        >

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Start a new analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
              Your analysis will be saved to your account.
            </p>
          </div>

          <div className="space-y-6">

            {/* Resume Upload */}
            <ResumeUploader
              file={file}
              setFile={setFile}
              className="dark:text-gray-500"
            />

            {/* Job Description */}
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
              >
                {error}
              </div>
            )}

            {/* Submit Section */}
            <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-5 dark:border-gray-800 sm:flex-row sm:items-center">

              <p className="text-xs leading-5 text-slate-400 dark:text-gray-500">
                PDF/DOCX · Job requirements · Saved analysis
              </p>

              <AnalyzeButton
                loading={loading}
                disabled={!file || !jobDescription.trim()}
              />

            </div>

          </div>
        </form>

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-8">
            <AnalysisResult analysis={analysis} />
          </div>
        )}

      </div>

      {/* Login Popup */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} />
      )}

    </main>
  );
}
