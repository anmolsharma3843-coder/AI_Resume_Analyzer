
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAnalysisHistory, deleteAnalysis, } from "../services/analysisService";

export default function AnalysisHistory() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const loadHistory = async () => {
    try {
      setError("");
      const data = await getAnalysisHistory();
      setAnalyses(data || []);
    } catch (err) {
      setError(err.message || "Failed to load analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume analysis?")) return;

    try {
      await deleteAnalysis(id);
      setAnalyses((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError(err.message || "Failed to delete analysis.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Analysis history
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Review your previously analyzed resumes.
            </p>
          </div>

          <Link
            to="/analyze"
            className="inline-flex items-center justify-center rounded-xl
              bg-indigo-600 px-5 py-3 text-sm font-semibold text-white
              transition hover:bg-indigo-700"
          >
            + New analysis
          </Link>
        </div>

        {error && (
          <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
            Loading your analyses...
          </div>
        ) : analyses.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:bg-gray-900">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              No analyses yet
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Upload your first resume to see results here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:bg-gray-900">
            <div className="divide-y divide-slate-100">
              {analyses.map((item) => (
                <article
                  key={item._id}
                  className="flex flex-col justify-between gap-4 p-5
                    transition hover:bg-slate-400 sm:flex-row sm:items-center dark:hover:bg-slate-800"
                >
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-slate-800 dark:text-slate-200">
                      {item.resumeFileName || "Resume analysis"}
                    </h2>

                    <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-200">
                      {item.summary || item.jobDescription || "No summary available"}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600 ">
                        {Number(item.score) || 0}%
                      </p>
                      <p className="text-xs text-slate-400">Match score</p>
                    </div>

                    <Link
                      to={`/analysis/${item._id}`}
                      className="rounded-lg border border-slate-200 px-3 py-2
                        text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-500"
                    >
                      View
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="rounded-lg px-3 py-2 text-sm font-medium
                        text-red-600 hover:bg-red-50 dark:hover:bg-gray-500"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
