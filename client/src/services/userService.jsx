export async function logout() {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include", // ensures cookie is cleared
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }
  return data;
}
