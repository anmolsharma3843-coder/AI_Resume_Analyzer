
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiFileText, FiCalendar } from "react-icons/fi";

import AnalysisResult from "../components/analysis/AnalysisResult";
import { getAnalysisById } from "../services/analysisService";

export default function AnalysisDetails() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAnalysisById(id);
  console.log(data)
        // Supports either { analysis: {...} } or a direct analysis object.
        setAnalysis(data?.data || data);
      } catch (err) {
        setError(err.message || "Failed to load resume analysis.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAnalysis();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          Loading your resume analysis...
        </div>
      </main>
    );
  }

  if (error || !analysis) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-500/30 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Unable to load analysis
          </h2>

          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {error || "The requested analysis was not found."}
          </p>

          <Link
            to="/analysis-history"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <FiArrowLeft />
            Back to history
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 transition-colors duration-300 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Navigation */}
        <Link
          to="/analysis-history"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
        >
          <FiArrowLeft />
          Back to analysis history
        </Link>

        {/* Resume Information */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-7">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
                <FiFileText size={24} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Resume analysis report
                </p>

                <h1 className="mt-1 truncate text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                  {analysis.resumeFileName || "Resume analysis"}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-gray-400">
                  <FiCalendar size={15} />

                  {analysis.createdAt
                    ? new Date(analysis.createdAt).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "Date unavailable"}
                </div>
              </div>
            </div>

            <div className="shrink-0 rounded-xl bg-indigo-50 px-5 py-3 text-center dark:bg-indigo-500/10">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {Number(analysis.score) || 0}%
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                Match score
              </p>
            </div>

          </div>
        </section>

        {/* Full Analysis Result */}
        <AnalysisResult analysis={analysis} />

      </div>
    </main>
  );
}