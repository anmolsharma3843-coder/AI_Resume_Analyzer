
import RequirementCard from "./RequirementCard";

export default function RequirementList({ requirements = [] }) {
  if (!requirements.length) {
    return (
      <div className="rounded-xl bg-slate-50 p-6 text-center">
        <p className="font-medium text-slate-700">
          No requirements available
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Try another job description.
        </p>
      </div>
    );
  }

  const groups = [
    { status: "met", title: "Met requirements" },
    { status: "partially_met", title: "Partially met" },
    { status: "missing", title: "Missing requirements" },
    { status: "unclear", title: "Needs review" },
  ];

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const items = requirements.filter(
          (item) => item.status === group.status
        );

        if (!items.length) return null;

        return (
          <section key={group.status}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {group.title}
              </h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1
                text-xs font-medium text-slate-600 ">
                {items.length}
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <RequirementCard
                  key={`${item.requirement}-${index}`}
                  item={item}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
