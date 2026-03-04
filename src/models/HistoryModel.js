// import React from "react";

// export function HistoryModel() {
//   const saved = localStorage.getItem("Details");
//   try {
//     const parsed = JSON.parse(saved);
//     if (parsed["undefined"]) delete parsed["undefined"];
//     return parsed && typeof parsed === "object" ? parsed : {};
//   } catch {
//     return {};
//   }
// }

// export default HistoryModel;

// historyModel.js

const BASE_URL = "http://localhost:5000/Details";

export async function getHistoryData() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch");

    const parsed = await response.json();

    // Clean up "undefined" key if it exists
    if (parsed && parsed["undefined"]) {
      delete parsed["undefined"];
    }

    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.error("Error fetching history:", error);
    return {};
  }
}
