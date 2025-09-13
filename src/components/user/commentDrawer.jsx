import React, { useState } from "react";

const CommentDrawer = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      username: "Anna Smith",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "This is amazing! 🔥 Can't wait to see what you do next.",
      liked: false,
    },
    {
      id: 2,
      username: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Great work! Really inspiring content. 👏",
      liked: false,
    },
    {
      id: 3,
      username: "Sam Wilson",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      text: "Love this! 😍 Keep going.",
      liked: false,
    },
    {
      id: 4,
      username: "Lucy Liu",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg",
      text: "Fantastic post!",
      liked: false,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const toggleLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        username: "You",
        avatar: "https://randomuser.me/api/portraits/lego/2.jpg",
        text: newComment,
        liked: false,
      },
    ]);
    setNewComment("");
  };

  return (
    <div
      style={{
        ...styles.wrapper,
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      <div style={styles.drawer}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>

        <h2 style={styles.heading}>Comments</h2>

        {/* Scrollable comments */}
        <div style={styles.commentsContainer}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.commentBox}>
              <img
                src={comment.avatar}
                alt={comment.username}
                style={styles.avatar}
              />
              <div style={styles.commentBody}>
                <span style={styles.username}>{comment.username}</span>
                <span style={styles.commentText}>{comment.text}</span>
                <div style={styles.actions}>
                  <button
                    style={{
                      ...styles.button,
                      color: comment.liked ? "red" : "#666",
                    }}
                    onClick={() => toggleLike(comment.id)}
                  >
                    ❤️ Like
                  </button>
                  <button style={styles.button}>💬 Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Box */}
        <div style={styles.addCommentBox}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <button style={styles.addButton} onClick={handleAddComment}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---
const styles = {
  wrapper: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "40vh",
    zIndex: 9999,
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    justifyContent: "center",
  },
  drawer: {
    background: "#fff",
    width: "100%",
    maxWidth: "700px",
    height: "100%",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "1rem",
    boxShadow: "0 -4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "0.8rem",
    textAlign: "center",
    paddingTop: "10px",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1rem",
    overflowY: "auto", // scrollable
  },
  commentBox: {
    display: "flex",
    gap: "0.5rem",
    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "0.6rem",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  commentBody: {
    display: "flex",
    flexDirection: "column",
    fontSize: "0.9rem",
    width: "100%",
  },
  username: {
    fontWeight: "600",
    marginBottom: "0.2rem",
  },
  commentText: {
    fontSize: "0.9rem",
    lineHeight: 1.4,
  },
  actions: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.3rem",
  },
  button: {
    border: "none",
    background: "none",
    fontSize: "0.8rem",
    color: "#666",
    cursor: "pointer",
    padding: 0,
  },
  addCommentBox: {
    display: "flex",
    gap: "0.5rem",
    paddingTop: "0.8rem",
    borderTop: "1px solid #ddd",
    background: "#fff",
  },
  input: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0.4rem 0.6rem",
    fontSize: "0.9rem",
    outline: "none",
  },
  addButton: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "0.4rem 1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CommentDrawer;
