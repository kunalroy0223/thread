import React, { useState, useEffect } from "react";
import "../../styles/user/commentDrawer.scss";
import { getComments } from "../../../backend/methods/GetComments";
import { postComment } from "../../../backend/methods/PostComment";
import { getAnalytics } from "../../../backend/methods/GetAnalytics"; 
import { postAnalytics } from "../../../backend/methods/PostAnalytics"; // ✅ unified analytics

const CommentDrawer = ({ postId, isOpen, onClose, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState({});
  const [analytics, setAnalytics] = useState({ likes: 0, comments: 0, views: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch comments + analytics when drawer opens
  useEffect(() => {
    if (!isOpen) return; // only fetch when open

    const fetchData = async () => {
      setLoading(true);
      try {
        const [commentsResult, analyticsResult] = await Promise.all([
          getComments(postId),
          getAnalytics(postId),
        ]);

        const commentsData = commentsResult?.success ? commentsResult.data || [] : [];
        setComments(commentsData);

        const analyticsData = analyticsResult?.success
          ? analyticsResult.data || { likes: 0, comments: 0, views: 0 }
          : { likes: 0, comments: 0, views: 0 };
        setAnalytics(analyticsData);

        // Track liked comments
        const likedMap = {};
        if (currentUser?.id) {
          commentsData.forEach((c) => {
            if (c.likedBy?.includes(currentUser.id)) likedMap[c.id] = true;
          });
        }
        setLikedComments(likedMap);

      } catch (err) {
        console.error("Error fetching comments/analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen, postId, currentUser?.id]);

  // Toggle comment like
  const handleLike = async (commentId) => {
    if (!currentUser?.id) return;

    const currentlyLiked = likedComments[commentId] || false;

    // Optimistic UI update
    setLikedComments((prev) => ({ ...prev, [commentId]: !currentlyLiked }));
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likesCount: (c.likesCount || 0) + (currentlyLiked ? -1 : 1) }
          : c
      )
    );

    try {
      await postAnalytics(postId, {
        commentId,
        likes: currentlyLiked ? -1 : 1,
        userId: currentUser.id,
      });
    } catch (err) {
      console.error("Error updating comment like:", err);
      // Rollback on failure
      setLikedComments((prev) => ({ ...prev, [commentId]: currentlyLiked }));
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, likesCount: (c.likesCount || 0) + (currentlyLiked ? 1 : -1) }
            : c
        )
      );
    }
  };

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !currentUser?.id) return;

    try {
      const result = await postComment({
        postId,
        authorId: `/users/${currentUser.id}`,
        content: newComment,
        parentCommentId: null,
      });

      if (result.success) {
        const newCommentObj = {
          id: result.id,
          authorId: `/users/${currentUser.id}`,
          username: currentUser.username,
          avatar: currentUser.avatar,
          content: newComment,
          likesCount: 0,
          likedBy: [],
          parentCommentId: null,
        };

        setComments((prev) => [...prev, newCommentObj]);
        setNewComment("");
        setAnalytics((prev) => ({ ...prev, comments: prev.comments + 1 }));
      } else {
        console.error(result.error);
        alert("Failed to post comment. Please try again.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Unexpected error. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="wrapper"
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div className="drawer">
        <button onClick={onClose} className="close-btn">✕</button>
        <h2 className="heading">Comments</h2>

        <div className="comments-container">
          {loading && <p>Loading comments...</p>}
          {!loading &&
            comments.map((c) => (
              <div key={c.id} className="comment-box">
                <img
                  src={c.avatar || "https://randomuser.me/api/portraits/lego/2.jpg"}
                  alt={c.username || c.authorId.split("/").pop()}
                  className="avatar"
                />
                <div className="comment-body">
                  <span className="username">{c.username || c.authorId.split("/").pop()}</span>
                  <span className="comment-text">{c.content}</span>
                  <div className="actions">
                    <button
                      className="button heart-btn"
                      style={{ color: likedComments[c.id] ? "red" : "#666" }}
                      onClick={() => handleLike(c.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill={likedComments[c.id] ? "red" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21C12 21 5 13.5 5 8.5C5 5.462 7.462 3 10.5 3C12.291 3 14 4.709 14 4.709C14 4.709 15.709 3 17.5 3C20.538 3 23 5.462 23 8.5C23 13.5 16 21 16 21H12Z"
                        />
                      </svg>
                      <span className="like-count">{c.likesCount || 0}</span>
                    </button>
                    <button className="button">Reply</button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="add-comment-box">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input"
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <button className="add-button" onClick={handleAddComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDrawer;
