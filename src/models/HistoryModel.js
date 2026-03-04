import React from "react";
const BASE_URL = "http://localhost:5000/Details";

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
