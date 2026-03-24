import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://quizapp-2bc75-default-rtdb.firebaseio.com",
  projectId: "quizapp-2bc75",
  storageBucket: "quizapp-2bc75.firebasestorage.app",
  messagingSenderId: "638135240888",
  appId: "1:638135240888:web:35fdb06d9683f7ef354c4d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
