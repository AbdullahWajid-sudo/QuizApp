const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const API_URL = isLocal 
  ? "http://localhost:5000/Details" 
  : "https://abdullahwajid-sudo.github.io/QuizApp/db.json";
export const saveHistory = async (quizName, entry) => {
  if (!quizName || quizName === "undefined") return null;

  try {
    const response = await fetch(API_URL);
    const historyObj = await response.json();
    const updatedHistory = {
      ...historyObj,
      [quizName]: [entry, ...(historyObj[quizName] || [])],
    };
    await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHistory),
    });

    return updatedHistory;
  } catch (error) {
    console.error("Failed to save history to JSON file:", error);
    return null;
  }
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
