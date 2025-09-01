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

export const getFirebaseErrorMessage = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este email já está em uso";
    case "auth/invalid-email":
      return "Email inválido";
    case "auth/operation-not-allowed":
      return "Operação não permitida";
    case "auth/weak-password":
      return "Senha muito fraca";
    case "auth/network-request-failed":
      return "Erro de conexão. Verifique sua internet";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde";
    case "firestore/permission-denied":
      return "Erro de permissão. Verifique as regras do Firestore";
    case "firestore/unavailable":
      return "Serviço temporariamente indisponível";
    case "firestore/deadline-exceeded":
      return "Tempo limite excedido. Tente novamente";
    default:
      return "Erro ao criar conta. Tente novamente";
  }
};