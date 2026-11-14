
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(
    `${BASE_URL}/api/analysis/analyze`,
    {
      method: "POST",
      credentials:"include",
      body: formData,
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Resume analysis failed");
  }
 
  return data.data;
}

export async function getAnalysisHistory() {
  const response = await fetch(`${BASE_URL}/api/analysis`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load history");
  }

  return data.data;
}


export const getAnalysisById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/api/analysis/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch analysis.");
  }

  return data;
};


export async function deleteAnalysis(id) {
  const response = await fetch(
    `${BASE_URL}/api/analysis/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete analysis");
  }

  return data;
}
