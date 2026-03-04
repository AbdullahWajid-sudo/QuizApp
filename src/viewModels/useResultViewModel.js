import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatResultEntry, saveHistory } from "../models/ResultModel";

export function useResultViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisibleResult, setIsVisibleResult] = useState(true);
  const resultData = location.state;
  const seconds = ("0" + Math.floor((resultData.finalTime / 1000) % 60)).slice(
    -2,
  );
  const totalTimeStr = `${seconds}sec`;
  useEffect(() => {
    if (!resultData.userName || !resultData.QuizName) return;
    const sessionKey = `saved_${resultData.userName}_${resultData.finalScore}`;
    if (sessionStorage.getItem(sessionKey)) return;
    const entry = formatResultEntry(resultData);
    saveHistory(resultData.QuizName, entry);
    sessionStorage.setItem(sessionKey, "true");
  }, [resultData]);

  return {
    state: {
      isVisibleResult,
      totalTimeStr,
      ...resultData,
    },
    actions: {
      navigate,
      setIsVisibleResult,
    },
  };
}
