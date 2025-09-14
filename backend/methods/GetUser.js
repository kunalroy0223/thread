// backend/methods/GetUser.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const getUserByEmail = async (email) => {
  if (!email) return { success: false, error: "Email is required" };

  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: "User not found" };
    }

    const docSnap = querySnapshot.docs[0];
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return { success: false, error: err.message };
  }
};
