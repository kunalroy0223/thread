// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);