import React from "react";

export function HistoryModel() {
  const saved = localStorage.getItem("Details");
  try {
    const parsed = JSON.parse(saved);
    if (parsed["undefined"]) delete parsed["undefined"];
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export default HistoryModel;
