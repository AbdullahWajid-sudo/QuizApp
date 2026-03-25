import { db } from "../../firebase"; // Double check this path matches your folder structure
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- SAVE LOGIC ---
export const saveHistory = async (quizName, entry) => {
  // Debugging: Log to see if this function is even being called
  console.log("Saving to Firestore...", { quizName, entry });

  if (!quizName || quizName === "undefined") {
    console.error("Save blocked: QuizName is undefined.");
    return null;
  }

  try {
    // Recommendation: Use lowercase "details" to match standard Firestore naming
    const docRef = await addDoc(collection(db, "Details"), {
      ...entry,
      quizName: quizName,
      timestamp: serverTimestamp(),
    });

    console.log("Document saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Failed to save history to Firebase:", error);
    return null;
  }
};

// --- FORMATTING LOGIC ---
export const formatResultEntry = (data) => {
  const seconds = ("0" + Math.floor((data.finalTime / 1000) % 60)).slice(-2);

  return {
    name: data.userName, // Changed to 'name' to match Admin Dashboard expectations
    // Correcting the score format: count/total instead of percentage/total
    score: `${data.correctAnswers || 0}/${data.totalQuestions || 0}`,
    percentage: data.finalScore,
    time: `${seconds}sec`,
    date: new Date().toLocaleDateString(),
    // Including raw data for the result table review
    userAnswers: data.userAnswers || data.finalAnswers,
    questions: data.questions || data.finalQuestions,
  };
};
