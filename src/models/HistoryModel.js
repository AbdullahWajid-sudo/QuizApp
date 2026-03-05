import React from "react";
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Set the URL based on the environment
const BASE_URL = isLocal
  ? "http://localhost:5000/Details"
  : "https://abdullahwajid-sudo.github.io/QuizApp/db.json";

export async function getHistoryData() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch");

    const parsed = await response.json();

    if (parsed && parsed["undefined"]) {
      delete parsed["undefined"];
    }

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Error fetching history:", error);
    return {};
  }
}
