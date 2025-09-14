// backend/methods/PostComment.js
import { db } from "../config/firebase-config"; // Firestore instance
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * Add a comment to Firestore
 * @param {string} postId - ID of the post
 * @param {string} authorId - User reference like 'users/{id}'
 * @param {string} content - Comment content
 * @param {string|null} parentCommentId - optional for replies
 * @returns {Promise<{success: boolean, id?: string, error?: any}>}
 */
export const postComment = async ({ postId, authorId, content, parentCommentId = null }) => {
  try {
    const docRef = await addDoc(collection(db, "comments"), {
      postId,
      authorId,
      content,
      parentCommentId,
      likesCount: 0,
      createdAt: serverTimestamp(), // ✅ correct Timestamp
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error };
  }
};
