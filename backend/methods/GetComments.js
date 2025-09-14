// backend/methods/GetComments.js
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config"; // your Firestore instance

/**
 * Fetch comments for a given post
 * @param {string} postId - Firestore document ID of the post
 * @returns {Promise<{success: boolean, data?: Array, error?: any}>}
 */
export const getComments = async (postId) => {
  if (!postId) {
    return { success: false, error: "postId is undefined" };
  }

  try {
    const commentsRef = collection(db, "comments");

    // Firestore requires a composite index when using 'where' + 'orderBy'
    // Make sure you create an index for postId + createdAt in the Firebase console
    const q = query(
      commentsRef,
      where("postId", "==", postId),
      orderBy("createdAt", "asc") // ascending order for oldest first
    );

    const snapshot = await getDocs(q);

    const comments = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        authorId: data.authorId || "unknown",
        content: data.content || "",
        likesCount: data.likesCount || 0,
        parentCommentId: data.parentCommentId || null,
        createdAt: data.createdAt?.toDate?.() || new Date(), // fallback to current date
        avatar: data.avatar || null,
        username: data.username || null,
      };
    });

    return { success: true, data: comments };
  } catch (error) {
    console.error("Error fetching comments:", error);

    // If the error is about missing index, log a helpful message
    if (error.code === "failed-precondition") {
      console.warn(
        "Firestore requires a composite index for this query. Visit the URL in the console to create it."
      );
    }

    return { success: false, error };
  }
};
