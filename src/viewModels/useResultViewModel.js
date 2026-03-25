import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
export function useResultViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisibleResult, setIsVisibleResult] = useState(true);
  // 1. ADD THIS: A local state to hold the Firestore ID once it's created
  const [generatedId, setGeneratedId] = useState(null);

  const resultData = location.state || {};

  const minutes = ("0" + Math.floor((resultData.finalTime / 60000) % 60)).slice(
    -2,
  );
  const seconds = ("0" + Math.floor((resultData.finalTime / 1000) % 60)).slice(
    -2,
  );
  const totalTimeStr = `${minutes}:${seconds}`;

  useEffect(() => {
    if (!resultData.userName || !resultData.QuizName) return;

    const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;

    // Check if we already have a saved ID in sessionStorage to prevent double-saving
    const existingId = sessionStorage.getItem(sessionKey);
    if (existingId) {
      setGeneratedId(existingId);
      return;
    }

    const saveToFirestore = async () => {
      try {
        // 2. Capture the docRef
        const docRef = await addDoc(collection(db, "certificates"), {
          userName: resultData.userName,
          QuizName: resultData.QuizName,
          finalScore: resultData.finalScore,
          correctAnswers: resultData.correctAnswers,
          totalQuestions: resultData.totalQuestions,
          timeTaken: totalTimeStr,
          // Saving full question data if needed for detailed review later
          // answers: resultData.userAnswers || resultData.finalAnswers || [],
          // questions: resultData.questions || resultData.finalQuestions || [],
          createdAt: serverTimestamp(),
        });

        // 3. SET THE ID: This makes attemptId available to your UI
        setGeneratedId(docRef.id);
        sessionStorage.setItem(sessionKey, docRef.id); // Save the ID instead of "true"

        console.log("Saved with generated ID:", docRef.id);
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
      // 4. OVERRIDE attemptId with the one Firestore just gave us
      attemptId: generatedId,
      ...resultData,
    },
    actions: {
      navigate,
      setIsVisibleResult,
    },
  };
}
