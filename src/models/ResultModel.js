import { db } from "../firebase"; // Double check this path matches your folder structure
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// --- FORMATTING LOGIC ---
export const formatResultEntry = (data) => {
  const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

  // This configuration matches your "Mon, Mar 09..." format exactly
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Date().toLocaleString("en-US", options);

  return {
    // 1. Match the database screenshot keys exactly:
    userName: data.userName || "Anonymous",
    quizName: data.QuizName || "General Quiz", // Use lowercase 'q' to match DB
    title: data.QuizName || "General Quiz", // Adding 'title' as a fallback
    score: `${data.correctAnswers || 0}/${data.totalQuestions || 0}`, // Format "9/10"
    percentage: data.finalScore,
    timeTaken: `${seconds}sec`, // Match 'timeTaken' from DB
    date: formattedDate, // Full string for the DB display
    // 2. Fix for "can't fetch user answer":
    // Ensure these keys match what your History/Admin page calls
    answers: data.userAnswers || [], // Match 'answers' in screenshot
    questions: data.questions || [], // Match 'questions' in screenshot
  };
};

// --- SAVE LOGIC ---
export const saveHistory = async (quizName, entry) => {
  try {
    const docRef = await addDoc(collection(db, "Details"), {
      ...entry,
      // Ensure the timestamp is a proper Firebase ServerTimestamp for sorting
      timestamp: serverTimestamp(),
    });

    console.log("Document saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Failed to save history to Firebase:", error);
    return null;
  }
};
