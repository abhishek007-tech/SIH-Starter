/**
 * API service layer.
 *
 * These are placeholder functions. During the hackathon, replace the body
 * of each function with a real fetch() call to your backend, keeping the
 * function signature the same so pages don't need to change.
 *
 * Example real implementation:
 *   export async function loginUser(credentials) {
 *     const res = await fetch(`${BASE_URL}/auth/login`, {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json" },
 *       body: JSON.stringify(credentials),
 *     });
 *     if (!res.ok) throw new Error("Login failed");
 *     return res.json();
 *   }
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// eslint-disable-next-line no-unused-vars
export async function loginUser(credentials) {
  // Placeholder for future authentication API.
  return { success: true, token: "demo-token" };
}

// eslint-disable-next-line no-unused-vars
export async function analyzeFile(file, data = {}) {
  // Placeholder for future backend API.
  // `file` will be a File object from the upload input.
  // `data` can carry extra fields such as the selected category/type.
  return {
    success: true,
    resultId: "demo-result",
  };
}

export async function getHistory() {
  // Placeholder for future history API.
  return [];
}

export async function getDashboardSummary() {
  // Placeholder for future dashboard API.
  return {};
}
