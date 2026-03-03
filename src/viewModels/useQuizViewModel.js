import { React, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (q.answer === userAnswer[index]) {
        finalScore++;
      }
    });

    setIsRunning(false);
    setIsQuizActive(false);

    navigate("/result", {
      state: {
        finalScore: finalScore,
        finalAnswers: userAnswer,
        finalQuestions: questions,
        userName: name,
        finalTime: time,
        QuizName: title,
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
