
export default function JobDescriptionInput({
  value,
  onChange,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <label
          htmlFor="jobDescription"
          className="text-sm font-semibold text-slate-700 dark:text-slate-100"
        >
          Job description
        </label>

        <span className="text-xs text-slate-400 dark:text-slate-300">
          {value.length} characters
        </span>
      </div>

      <textarea
        id="jobDescription"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description and requirements here..."
        rows={8}
        maxLength={12000}
        required
        className="w-full resize-y rounded-xl border border-slate-200
          bg-white p-4 text-sm leading-6 text-slate-700 outline-none
          transition placeholder:text-slate-400
          focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:text-slate-200 dark:bg-slate-800"
      />

      <p className="mt-2 text-xs text-slate-500">
        Include responsibilities, skills, experience, and qualifications.
      </p>
    </div>
  );
}
