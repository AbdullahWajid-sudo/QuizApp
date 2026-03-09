import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPCQ4T_2NXDxsxmSzz_BxhXCbMA1P3iec",
  authDomain: "quizapp-2bc75.firebaseapp.com",
  databaseURL: "https://quizapp-2bc75-default-rtdb.firebaseio.com",
  projectId: "quizapp-2bc75",
  storageBucket: "quizapp-2bc75.firebasestorage.app",
  messagingSenderId: "638135240888",
  appId: "1:638135240888:web:35fdb06d9683f7ef354c4d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
