// backend/methods/GetAnalytics.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config"; // Firestore instance

/**
 * Fetch analytics for a specific post
 * @param {string} postId
 */
export const getAnalytics = async (postId) => {
  try {
    const analyticsRef = doc(db, "analytics", postId);
    const docSnap = await getDoc(analyticsRef);

    if (!docSnap.exists()) return { success: false, error: "No analytics found" };

    return { success: true, data: docSnap.data() };
  } catch (err) {
    console.error("Error fetching analytics:", err);
    return { success: false, error: err.message };
  }
};
