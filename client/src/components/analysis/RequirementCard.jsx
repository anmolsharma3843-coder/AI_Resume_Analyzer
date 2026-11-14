
const statusStyles = {
  met: "bg-emerald-50 text-emerald-700",
  partially_met: "bg-amber-50 text-amber-700",
  missing: "bg-red-50 text-red-700",
  unclear: "bg-slate-100 text-slate-600",
};

const statusLabels = {
  met: "Met",
  partially_met: "Partially met",
  missing: "Not found",
  unclear: "Unclear",
};

export default function RequirementCard({ item }) {
  const status = statusStyles[item.status]
    ? item.status
    : "unclear";

  return (
    <article className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200">
            {item.requirement}
          </h4>

          <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-200">
            {(item.category || "other").replaceAll("_", " ")}
          </p>
        </div>

        <span className={`shrink-0 rounded-full px-3 py-1
          text-xs font-semibold ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      {item.evidence && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide
            text-slate-400">
            Resume evidence
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-100">
            {item.evidence}
          </p>
        </div>
      )}

      {item.recommendation && (
        <div className="mt-3 rounded-lg bg-indigo-50/70 p-3">
          <p className="text-xs font-semibold text-indigo-700">
            Recommendation
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-600">
            {item.recommendation}
          </p>
        </div>
      )}
    </article>
  );
}
