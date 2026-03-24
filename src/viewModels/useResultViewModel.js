import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function useResultViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisibleResult, setIsVisibleResult] = useState(true);

  const resultData = location.state || {};

  const seconds = ("0" + Math.floor((resultData.finalTime / 1000) % 60)).slice(
    -2,
  );
  const totalTimeStr = `${seconds}sec`;

  useEffect(() => {
    if (!resultData.userName || !resultData.QuizName) return;

    const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;
    if (sessionStorage.getItem(sessionKey)) return;

    const saveToFirestore = async () => {
      try {
        // MATCHING YOUR DESIRED FORMAT (Image 3)
        await addDoc(collection(db, "Details"), {
          userName: resultData.userName,
          quizName: resultData.QuizName,
          title: resultData.QuizName,
          score: `${resultData.correctAnswers}/${resultData.totalQuestions}`,
          timeTaken: totalTimeStr,
          answers: resultData.userAnswers || resultData.finalAnswers || [],
          questions: resultData.questions || resultData.finalQuestions || [],
          date: new Date().toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          timestamp: serverTimestamp(),
        });

        sessionStorage.setItem(sessionKey, "true");
        console.log("Results stored in the correct format!");
      } catch (error) {
        console.error("Firebase Save Error:", error);
      }
    };

    saveToFirestore();
  }, [resultData, totalTimeStr]);

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
