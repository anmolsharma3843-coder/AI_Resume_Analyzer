
export default function FeedbackSection({
  title,
  items = [],
  type = "strength",
}) {
  const styles = {
    strength: {
      icon: "✓",
      container: "border-emerald-100 bg-emerald-50/50 dark:bg-gray-600",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
    weakness: {
      icon: "!",
      container: "border-amber-100 bg-amber-50/50 dark:bg-gray-600",
      iconBg: "bg-amber-100 text-amber-700",
    },
    suggestion: {
      icon: "✦",
      container: "border-indigo-100 bg-indigo-50/50 dark:bg-gray-600",
      iconBg: "bg-indigo-100 text-indigo-700",
    },
  };

  const style = styles[type] || styles.suggestion;

  return (
    <section className={`rounded-2xl border p-5 ${style.container}`} >
      <h3 className="mb-4 font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h3>

      {items.length ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex gap-3">
              <span className={`flex h-6 w-6 shrink-0 items-center
                justify-center rounded-full text-xs font-bold ${style.iconBg}`}>
                {style.icon}
              </span>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-100">
                {item}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-100">
          No items available.
        </p>
      )}
    </section>
  );
}
