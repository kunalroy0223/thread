// backend/config/firebase-config.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoIhTP5kEh4oQQDj2vUMHTnbqNVpyGpHI",
  authDomain: "thread-5688d.firebaseapp.com",
  projectId: "thread-5688d",
  storageBucket: "thread-5688d.firebasestorage.app",
  messagingSenderId: "341836001524",
  appId: "1:341836001524:web:fd17771a89982a885f6ea1",
  measurementId: "G-15QDMWCLYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Providers ---
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider('apple.com'); // Apple provider

export { 
  auth, 
  db, 
  googleProvider, 
  appleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
};
