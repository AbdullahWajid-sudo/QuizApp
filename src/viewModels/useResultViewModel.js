import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 1. IMPORT YOUR MODEL (The missing piece!)
import { saveHistory, formatResultEntry } from "../models/ResultModel";

export function useResultViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisibleResult, setIsVisibleResult] = useState(true);

  const resultData = useMemo(() => location.state || {}, [location.state]);

  const [generatedId, setGeneratedId] = useState(() => {
    if (!resultData.userName || !resultData.QuizName) return null;
    const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;
    return sessionStorage.getItem(sessionKey);
  });

  // Time Calculation
  const minutes = ("0" + Math.floor((resultData.finalTime / 60000) % 60)).slice(
    -2,
  );
  const seconds = ("0" + Math.floor((resultData.finalTime / 1000) % 60)).slice(
    -2,
  );
  const totalTimeStr = `${minutes}:${seconds}`;

  useEffect(() => {
    // Stop if data is missing or already saved
    if (!resultData.userName || !resultData.QuizName || generatedId) return;

    const handleSave = async () => {
      // 2. FORMAT THE DATA using your model's logic
      const entry = formatResultEntry({
        ...resultData,
        finalTime: resultData.finalTime, // ensure this is passed for formatting
      });

      // 3. CALL THE MODEL'S SAVE FUNCTION
      const docId = await saveHistory(resultData.QuizName, entry);

      if (docId) {
        const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;
        setGeneratedId(docId);
        sessionStorage.setItem(sessionKey, docId);
        console.log("Verified Save with ID:", docId);
      }
    };

    handleSave();
  }, [resultData, generatedId]); // Simplified dependencies

  return {
    state: {
      isVisibleResult,
      totalTimeStr,
      attemptId: generatedId,
      ...resultData,
    },
    actions: {
      navigate,
      setIsVisibleResult,
    },
  };
}
