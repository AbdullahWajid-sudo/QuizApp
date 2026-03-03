export const saveHistory = (quizName, entry) => {
  if (!quizName || quizName === "undefined") return null;

  const saved = localStorage.getItem("Details");
  const historyObj = JSON.parse(saved || "{}");

  const updatedHistory = {
    ...historyObj,
    [quizName]: [entry, ...(historyObj[quizName] || [])],
  };

  localStorage.setItem("Details", JSON.stringify(updatedHistory));
  return updatedHistory;
};

export const formatResultEntry = (data) => {
  const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDate = formatter.format(new Date());

  return {
    id: Date.now(),
    userName: data.userName,
    score: `${data.finalScore}/${data.finalQuestions?.length || 0}`,
    timeTaken: `${seconds}sec`,
    date: formattedDate,
    title: data.QuizName,
    answers: data.finalAnswers,
    question: data.finalQuestions,
  };
};
