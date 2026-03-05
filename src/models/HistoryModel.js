const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const BASE_URL = isLocal
  ? "http://localhost:5000/Details"
  : `${import.meta.env.BASE_URL}db.json`;

export async function getHistoryData() {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) throw new Error("Failed to fetch");

    const parsed = await response.json();

    return isLocal ? parsed : parsed.Details || [];
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
