import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getHistoryData() {
  try {
    const historyCol = collection(db, "Details");
    const querySnapshot = await getDocs(historyCol);
    const historyData = querySnapshot.docs.map((doc) => ({
      id: doc.title,
      ...doc.data(),
    }));
    return historyData || [];
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
}
