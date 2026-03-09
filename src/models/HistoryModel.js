import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getHistoryData() {
  try {
    const historyCol = collection(db, "Details");
    const querySnapshot = await getDocs(historyCol);

    // Map Firestore docs to a simple array
    const historyData = querySnapshot.docs.map((doc) => ({
      id: doc.title, // Use the unique Firestore ID
      ...doc.data(), // Spread the fields (userName, score, title, etc.)
    }));

    // CRITICAL: Ensure we always return an array to avoid .filter() errors
    return historyData || [];
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
