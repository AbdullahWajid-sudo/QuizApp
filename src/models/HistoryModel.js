import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

// REMOVE 'async' here. This must return the unsubscribe function immediately.
export function getHistoryData(onUpdate) {
  const q = query(collection(db, "Details"), orderBy("timestamp", "desc"));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onUpdate(data);
    },
    (error) => {
      console.error("Firestore Error:", error);
      onUpdate([]); // Send empty array on error to stop loading states
    },
  );

  return unsubscribe; // This is the function React needs for cleanup
}
