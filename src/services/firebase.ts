import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAWwImxatooLaSFCEDI9-WzxPfn7uvf2SY",
  authDomain: "muscle-ai-41bc3.firebaseapp.com",
  projectId: "muscle-ai-41bc3",
  storageBucket: "muscle-ai-41bc3.firebasestorage.app",
  messagingSenderId: "54437526785",
  appId: "1:54437526785:web:4c02830400933a0d7cef00",
  measurementId: "G-7467Y6QSKC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);