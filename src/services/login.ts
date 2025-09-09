import { auth, getFirebaseErrorMessage } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export interface LoginInfos {
  email: string;
  password: string;
}

export const submitLogin = async (infos: LoginInfos) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, infos.email, infos.password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error: any) {
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};
