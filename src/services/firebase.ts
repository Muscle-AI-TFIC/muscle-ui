import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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

export const getFirebaseErrorMessage = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already in use";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/operation-not-allowed":
      return "Operation not allowed";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/network-request-failed":
      return "Network error. Please check your connection";
    case "auth/too-many-requests":
      return "Too many requests. Please try again later";
    case "firestore/permission-denied":
      return "Permission error. Please check your Firestore rules";
    case "firestore/unavailable":
      return "Service temporarily unavailable";
    case "firestore/deadline-exceeded":
      return "Request timed out. Please try again";
    default:
      return "Error creating account. Please try again";
  }
};