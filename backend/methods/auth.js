// backend/methods/auth.js
import { auth, db, googleProvider, appleProvider } from '../config/firebase-config';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

// --- Google Sign Up / Sign In ---
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      username: user.displayName || "",
      password: "", // Google login → no password
      createdAt: serverTimestamp()
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

// --- Apple Sign Up / Sign In ---
export const signInWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      username: user.displayName || "",
      password: "", // Apple login → no password
      createdAt: serverTimestamp()
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Apple Sign-In Error:", error.message);
    throw error;
  }
};

// --- Email/Password Signup ---
export const signupWithEmail = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      password,
      createdAt: serverTimestamp()
    });

    return user;
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw error;
  }
};

// --- Email/Username + Password Login ---
export const loginWithEmail = async (identifier, password) => {
  try {
    let emailToUse = identifier;

    // If not an email, treat it as a username
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      const q = query(collection(db, "users"), where("username", "==", identifier));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No user found with this username.");
      }

      // Use the first matching user
      const userData = querySnapshot.docs[0].data();
      emailToUse = userData.email;
    }

    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    return userCredential.user;

  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};
