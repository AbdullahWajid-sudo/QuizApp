// export const saveHistory = (quizName, entry) => {
//   if (!quizName || quizName === "undefined") return null;

//   const saved = localStorage.getItem("Details");
//   const historyObj = JSON.parse(saved || "{}");

//   const updatedHistory = {
//     ...historyObj,
//     [quizName]: [entry, ...(historyObj[quizName] || [])],
//   };

//   localStorage.setItem("Details", JSON.stringify(updatedHistory));
//   return updatedHistory;
// };

// export const formatResultEntry = (data) => {
//   const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

//   const formatter = new Intl.DateTimeFormat("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
//   const formattedDate = formatter.format(new Date());

//   return {
//     id: Date.now(),
//     userName: data.userName,
//     score: `${data.finalScore}/${data.finalQuestions?.length || 0}`,
//     timeTaken: `${seconds}sec`,
//     date: formattedDate,
//     title: data.QuizName,
//     answers: data.finalAnswers,
//     question: data.finalQuestions,
//   };
// };

// resultModel.js
// Change the URL to match your json-server port (usually 5000 or 3000)
const API_URL = "http://localhost:5000/Details";

/**
 * 1. Converted to 'async' because we must wait for the fetch response.
 */
export const saveHistory = async (quizName, entry) => {
  if (!quizName || quizName === "undefined") return null;

  try {
    // Step A: Fetch the current data from your db.json
    const response = await fetch(API_URL);
    const historyObj = await response.json();

    // Step B: Update the object locally (same logic you had before)
    const updatedHistory = {
      ...historyObj,
      [quizName]: [entry, ...(historyObj[quizName] || [])],
    };

    // Step C: Send the updated object back to the JSON file
    // We use PUT to replace the old "Details" object with the new one
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

/**
 * 2. This function stays exactly the same!
 * It just prepares the data, so it doesn't need to be async.
 */
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
