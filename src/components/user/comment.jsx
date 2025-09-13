import React, { useState } from "react";

const Comment = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.commentBox}>
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="Comment User"
          style={styles.avatar}
        />
        <div style={styles.commentBody}>
          <span style={styles.username}>Anna Smith</span>
          <span style={styles.commentText}>
            This is amazing! 🔥 Can't wait to see what you do next.
          </span>
          <div style={styles.actions}>
            <button
              style={{
                ...styles.button,
                color: liked ? "red" : "#666",
              }}
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={liked ? "red" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={styles.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21C12 21 5 13.5 5 8.5C5 5.462 7.462 3 10.5 3C12.291 3 14 4.709 14 4.709C14 4.709 15.709 3 17.5 3C20.538 3 23 5.462 23 8.5C23 13.5 16 21 16 21H12Z"
                />
              </svg>
              Like
            </button>
            <button style={styles.button}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                style={styles.icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                />
              </svg>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles (scoped to this component)
const styles = {
  container: {
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
    padding: "1rem",
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
  },
  commentBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    background: "#f3f3f3",
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
    color: "#1f2937",
    marginBottom: "0.2rem",
  },
  commentText: {
    color: "#444",
    fontSize: "0.9rem",
    lineHeight: 1.4,
  },
  actions: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.3rem",
  },
  button: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    border: "none",
    background: "none",
    color: "#666",
    fontSize: "0.8rem",
    cursor: "pointer",
    padding: 0,
  },
  icon: {
    width: "14px",
    height: "14px",
  },
};

export default Comment;
