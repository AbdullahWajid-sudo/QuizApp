import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveHistory = async (quizName, entry) => {
  if (!quizName || quizName === "undefined") return null;

  try {
    // Add a new document to the "history" collection
    const docRef = await addDoc(collection(db, "Details"), {
      ...entry,
      quizName: quizName, // Keep track of which quiz this belongs to
      timestamp: serverTimestamp(), // Best practice for sorting later
    });

    return docRef.id;
  } catch (error) {
    console.error("Failed to save history to Firebase:", error);
    return null;
  }
};

// formatResultEntry stays mostly the same, but we remove the manual ID
export const formatResultEntry = (data) => {
  const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

  // We keep your date formatting as is for the UI string
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
    // Firebase generates its own unique ID, so we don't strictly need Date.now()
    userName: data.userName,
    score: `${data.finalScore}/${data.finalQuestions?.length || 0}`,
    timeTaken: `${seconds}sec`,
    date: formattedDate,
    title: data.QuizName,
    answers: data.finalAnswers,
    questions: data.finalQuestions,
  };
};
