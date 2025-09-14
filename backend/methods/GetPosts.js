// backend/methods/GetPosts.js
import { db } from "../config/firebase-config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

/**
 * Fetches all posts from Firestore, ordered by createdAt descending
 */
export const getPosts = async () => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: posts };
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    return { success: false, error };
  }
};

/**
 * Fetches posts for a specific user by UID
 * @param {string} uid
 */
export const getUserPosts = async (uid) => {
  if (!uid) return { success: false, error: "User ID is required" };

  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("authorId", "==", `/users/${uid}`), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { success: true, data: posts };
  } catch (error) {
    console.error("❌ Error fetching user posts:", error);
    return { success: false, error };
  }
};
