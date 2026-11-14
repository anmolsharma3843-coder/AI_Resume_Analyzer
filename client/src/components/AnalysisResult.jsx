import React from "react";

const AnalysisResult = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="mt-6 p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-bold mb-2">Analysis Result</h3>
      <p className="whitespace-pre-line">{analysis}</p>
    </div>
  );
};

export default AnalysisResult;
