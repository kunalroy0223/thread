// backend/methods/PostAnalytics.js
import { db } from "../config/firebase-config"; // adjust path
import { doc, getDoc, setDoc } from "firebase/firestore";

/* ------------------- POSTS ------------------- */
export const postAnalytics = async (postId, { likes = 0, userId }) => {
  try {
    const docRef = doc(db, "postsAnalytics", postId);
    const docSnap = await getDoc(docRef);
    let data = { likes: 0, likedBy: [] };
    if (docSnap.exists()) data = docSnap.data();

    const likedBy = new Set(data.likedBy || []);
    if (likes > 0) likedBy.add(userId);
    if (likes < 0) likedBy.delete(userId);

    await setDoc(
      docRef,
      { likes: likedBy.size, likedBy: Array.from(likedBy) },
      { merge: true }
    );

    return { success: true, likes: likedBy.size };
  } catch (err) {
    console.error("Error updating post analytics:", err);
    return { success: false, error: err.message };
  }
};

export const getAnalytics = async (postId) => {
  try {
    const docRef = doc(db, "postsAnalytics", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { success: true, data: docSnap.data() };
    return { success: true, data: { likes: 0, comments: 0, views: 0 } };
  } catch (err) {
    console.error("Error getting analytics:", err);
    return { success: false, error: err.message };
  }
};

/* ------------------- COMMENTS ------------------- */
export const toggleCommentLike = async (postId, commentId, userId) => {
  try {
    const docRef = doc(db, "comments", commentId); // assumes each comment is a doc
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { success: false, error: "Comment not found" };

    const data = docSnap.data();
    const likedBy = new Set(data.likedBy || []);

    let liked;
    if (likedBy.has(userId)) {
      likedBy.delete(userId);
      liked = false;
    } else {
      likedBy.add(userId);
      liked = true;
    }

    await setDoc(docRef, { likedBy: Array.from(likedBy), likesCount: likedBy.size }, { merge: true });

    return { success: true, liked };
  } catch (err) {
    console.error("Error toggling comment like:", err);
    return { success: false, error: err.message };
  }
};
