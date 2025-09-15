import React, { useState, useEffect } from "react";
import "../../styles/user/comment.scss";
import { getComments } from "../../../backend/methods/GetComments";
import { postComment } from "../../../backend/methods/PostComment";
import { getAnalytics } from "../../../backend/methods/GetAnalytics"; 
import { postAnalytics } from "../../../backend/methods/PostAnalytics"; // ✅ use postAnalytics instead of missing toggleCommentLike

const Comment = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedComments, setLikedComments] = useState({});
  const [analytics, setAnalytics] = useState({ likes: 0, comments: 0, views: 0 });

  // Fetch comments + analytics
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [commentsResult, analyticsResult] = await Promise.all([
          getComments(postId),
          getAnalytics(postId),
        ]);

        // Ensure defensive defaults
        const commentsData = commentsResult?.success ? commentsResult.data || [] : [];
        setComments(commentsData);

        const analyticsData = analyticsResult?.success
          ? analyticsResult.data || { likes: 0, comments: 0, views: 0 }
          : { likes: 0, comments: 0, views: 0 };
        setAnalytics(analyticsData);

        // Mark liked comments for current user
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
  }, [postId, currentUser?.id]);

  // Handle like/unlike for a comment
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
      // Rollback on error
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

  // Handle adding a new comment
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

        // Update analytics locally
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

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comment-container">
      {/* Render comments */}
      {comments.map((c) => (
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

      {/* Add comment input */}
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
  );
};

export default Comment;
