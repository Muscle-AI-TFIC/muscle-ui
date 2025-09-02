import { auth, db, getFirebaseErrorMessage } from "@/services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export interface RegisterInfos {
  name: string;
  email: string;
  password: string;
}

export const submitRegistration = async (infos: RegisterInfos) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, infos.email, infos.password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: infos.name });

    await setDoc(doc(db, "users", user.uid), {
      name: infos.name,
      email: infos.email,
    });

    return {
      name: infos.name,
      email: infos.email,
    };
  } catch (error: any) {
    throw new Error(getFirebaseErrorMessage(error.code));
  }
};
