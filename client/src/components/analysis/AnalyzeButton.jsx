
export default function AnalyzeButton({ loading, disabled }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="flex w-full items-center justify-center gap-2
        rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold
        text-white shadow-sm transition hover:bg-indigo-700
        disabled:cursor-not-allowed disabled:opacity-60
        sm:w-auto"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full
            border-2 border-white/40 border-t-white" />
          Analyzing resume...
        </>
      ) : (
        <>✦ Analyze Resume</>
      )}
    </button>
  );
}
