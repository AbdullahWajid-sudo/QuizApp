import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export function useResultViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisibleResult, setIsVisibleResult] = useState(true);

  // FIX 1: Stable resultData using useMemo
  const resultData = useMemo(() => location.state || {}, [location.state]);

  // FIX 2: Initialize state directly from sessionStorage to avoid Effect-loop
  const [generatedId, setGeneratedId] = useState(() => {
    if (!resultData.userName || !resultData.QuizName) return null;
    const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;
    return sessionStorage.getItem(sessionKey);
  });

  const minutes = ("0" + Math.floor((resultData.finalTime / 60000) % 60)).slice(-2);
  const seconds = ("0" + Math.floor((resultData.finalTime / 1000) % 60)).slice(-2);
  const totalTimeStr = `${minutes}:${seconds}`;

  useEffect(() => {
    // If we already have an ID (either from init or previous save), don't run again
    if (!resultData.userName || !resultData.QuizName || generatedId) return;

    const saveToFirestore = async () => {
      try {
        const docRef = await addDoc(collection(db, "Details"), {
          userName: resultData.userName,
          QuizName: resultData.QuizName,
          finalScore: resultData.finalScore,
          correctAnswers: resultData.correctAnswers,
          totalQuestions: resultData.totalQuestions,
          timeTaken: totalTimeStr,
          createdAt: serverTimestamp(),
        });

        const sessionKey = `saved_${resultData.userName}_${resultData.QuizName}_${resultData.finalScore}`;
        setGeneratedId(docRef.id);
        sessionStorage.setItem(sessionKey, docRef.id);

        console.log("Saved with generated ID:", docRef.id);
      } catch (error) {
        console.error("Firebase Save Error:", error);
      }
    };

    saveToFirestore();
  }, [resultData, totalTimeStr, generatedId]); // Added generatedId to deps

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