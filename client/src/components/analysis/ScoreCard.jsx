
export default function ScoreCard({ score = 0 }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:bg-gray-600">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-100">
        Resume match score
      </p>

      <div className="mt-4 flex items-center gap-5">
        <div
          className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#4f46e5 ${safeScore}%, #e2e8f0 0)`,
          }}
        >
          <div className="grid h-[76px] w-[76px] place-items-center
            rounded-full bg-white">
            <span className="text-2xl font-bold text-slate-900">
              {safeScore}%
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            Requirement match
          </h3>
          <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-200">
            Based on the requirements evaluated against your resume.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-300">
        This is an indicative matching score, not a prediction of hiring success.
      </p>
    </div>
  );
}
