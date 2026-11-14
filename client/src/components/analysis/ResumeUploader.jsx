
import { useRef } from "react";

export default function ResumeUploader({ file, setFile }) {
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const validExtension = /\.(pdf|docx)$/i.test(selectedFile.name);

    if (!validExtension) {
      alert("Please select a PDF or DOCX file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5 MB.");
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Upload your resume
      </label>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed
          border-slate-300 bg-slate-50 p-8 text-center dark:bg-slate-800 
          transition hover:border-indigo-400 hover:bg-indigo-50/40"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <div className="mx-auto mb-3 flex h-14 w-14 items-center
          justify-center rounded-2xl bg-indigo-100 text-2xl dark:text-slate-900">
          ↑
        </div>

        <p className="font-semibold text-slate-800 dark:text-slate-100">
          Click to upload or drag and drop
        </p>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-200">
          PDF or DOCX · Maximum 5 MB
        </p>
      </div>

      {file && (
        <div className="mt-3 flex items-center justify-between gap-3
          rounded-xl border border-slate-200 bg-white p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">
              {file.name}
            </p>
            <p className="text-xs text-slate-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="rounded-lg px-3 py-2 text-sm text-red-600
              hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
