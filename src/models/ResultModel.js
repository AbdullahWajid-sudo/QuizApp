import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- SAVE LOGIC ---
export const saveHistory = async (quizName, entry) => {
  if (!quizName || quizName === "undefined") return null;

  try {
    // We ensure the document is saved with a sortable serverTimestamp
    const docRef = await addDoc(collection(db, "Details"), {
      ...entry,
      quizName: quizName,
      timestamp: serverTimestamp(), // This is the 'Anchor' for your sorting
    });

    return docRef.id;
  } catch (error) {
    console.error("Failed to save history to Firebase:", error);
    return null;
  }
};

// --- FORMATTING LOGIC ---
export const formatResultEntry = (data) => {
  const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

  // Helper for human-readable date
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
    userName: data.userName,
    score: `${data.finalScore}/${data.finalQuestions?.length || 0}`,
    timeTaken: `${seconds}sec`,
    date: formattedDate, // For display only
    title: data.QuizName,
    answers: data.finalAnswers, // If this is an array, it stays in order
    questions: data.finalQuestions,
  };
};
