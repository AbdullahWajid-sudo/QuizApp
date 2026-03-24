import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../components/Authentication/Login";

export function useQuizViewModel() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, title, name } = location.state || {};
  const [questionNo, setQuestionNo] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);
  const [userAnswer, setUserAnswer] = useState(() =>
    questions ? new Array(questions.length).fill(undefined) : [],
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const quizLength = questions.length;
  const currentQuestion = questions[questionNo];

  const formatTime = (milliseconds) => {
    const minutes = ("0" + Math.floor((milliseconds / 60000) % 60)).slice(-2);
    const seconds = ("0" + Math.floor((milliseconds / 1000) % 60)).slice(-2);
    // const ms = ("0" + ((milliseconds / 10) % 100)).slice(-2);
    return `${minutes}:${seconds}`;
  };

  const prevHandler = () => setQuestionNo((prev) => prev - 1);
  const nextHandler = () => setQuestionNo((prev) => prev + 1);

  const selectHandle = (selectedOption) => {
    const ans = [...userAnswer];
    ans[questionNo] = selectedOption;
    setUserAnswer(ans);
  };

  const isAnyUnanswered = () => {
    return userAnswer.some((answer) => answer === undefined);
  };

  const submitHandler = () => {
    // Use a local variable to ensure we have questions
    const quizQuestions = questions || [];

    // Debug check: If this prints 0, the data didn't arrive from SelectQuiz
    console.log("Submitting with questions count:", quizQuestions.length);

    let correctCount = 0;

    // Entering the loop
    quizQuestions.forEach((q, index) => {
      // 1. MUST use correctAnswer to match your Firestore fields
      if (q.correctAnswer === userAnswer[index]) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / quizQuestions.length) * 100);

    setIsRunning(false);
    setIsQuizActive(false);

    navigate("/result", {
      state: {
        userName: name,
        QuizName: title,
        finalScore: percentage,
        correctAnswers: correctCount,
        totalQuestions: quizQuestions.length,
        // 2. CRITICAL: These keys must match ResultView.jsx
        questions: quizQuestions,
        userAnswers: userAnswer,
        finalTime: time,
      },
    });
  };

  return {
    state: {
      isQuizActive,
      quizLength,
      currentQuestion,
      name,
      title,
      time,
      questionNo,
      userAnswer,
    },
    action: {
      prevHandler,
      submitHandler,
      isAnyUnanswered,
      selectHandle,
      nextHandler,
      formatTime,
    },
  };
}
