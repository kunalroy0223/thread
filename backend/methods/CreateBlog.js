// backend/methods/CreateBlog.js
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { db } from "../config/firebase-config"; // ✅ use your existing Firestore instance

export async function createBlog({
  authorId = "H6jR2qHHXXwmhdPmANo6",
  title = "",
  content = "",
  coverImage = "",
  slug = "",
  status = "draft",
  tags = [""]
}) {
  try {
    const newPost = {
      authorId: doc(db, "users", authorId), // reference to user doc
      commentsCount: 0,
      content,
      coverImage,
      createdAt: serverTimestamp(),
      likesCount: 0,
      slug,
      status,
      tags,
      title,
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "posts"), newPost);
    return { id: docRef.id, success: true };
  } catch (error) {
    console.error("❌ Error adding blog post:", error);
    return { success: false, error };
  }
}
