import ScoreCard from "./ScoreCard";
import RequirementList from "./RequirementList";
import FeedbackSection from "./FeedbackSection";

export default function AnalysisResult({ analysis }) {
  if (!analysis) return null;

  const requirements = analysis.requirements || [];

  return (
    <section className="mt-8 space-y-6" aria-live="polite">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Analysis complete
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Your resume insights
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">
          {analysis.summary ||
            "Review how your resume aligns with the job requirements."}
        </p>
      </div>

      {/* Overall score */}
      <ScoreCard score={analysis.score ?? 0} />

      {/* Requirement statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <p className="text-sm text-green-700 dark:text-green-400">
            Matched
          </p>
          <p className="mt-1 text-2xl font-bold text-green-800 dark:text-green-300">
            {analysis.matchedRequirements?.length || 0}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Partial
          </p>
          <p className="mt-1 text-2xl font-bold text-amber-800 dark:text-amber-300">
            {analysis.partialRequirements?.length || 0}
          </p>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
          <p className="text-sm text-red-700 dark:text-red-400">
            Missing
          </p>
          <p className="mt-1 text-2xl font-bold text-red-800 dark:text-red-300">
            {analysis.missingRequirements?.length || 0}
          </p>
        </div>
      </div>

      {/* Strengths and weaknesses */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FeedbackSection
          title="Strengths"
          items={analysis.strengths || []}
          type="strength"
        />

        <FeedbackSection
          title="Areas to improve"
          items={analysis.weaknesses || []}
          type="weakness"
        />
      </div>

      {/* Job requirement matching */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Job requirement matching
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            Review the evidence for each requirement.
          </p>
        </div>

        {requirements.length > 0 ? (
          <RequirementList requirements={requirements} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-300">
            No requirements were evaluated.
          </p>
        )}
      </div>

      {/* Recommendations */}
      <FeedbackSection
        title="Recommended improvements"
        items={analysis.suggestions || []}
        type="suggestion"
      />
    </section>
  );
}
