import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      text: "Anna Smith liked your post",
      type: "like",
      time: "2h ago",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "John Doe commented: Awesome work!",
      type: "comment",
      time: "3h ago",
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
      text: "Sam Wilson started following you",
      type: "follow",
      time: "5h ago",
    },
  ]);

  return (
    
    <div style={styles.page}>
      <Sidebar />
      <h2 style={styles.heading}>Notifications</h2>
      <div style={styles.list}>
        {notifications.map((n) => (
          <div key={n.id} style={styles.notification}>
            <img src={n.avatar} alt="User" style={styles.avatar} />
            <div style={styles.textContainer}>
              <span style={styles.text}>{n.text}</span>
              <span style={styles.time}>{n.time}</span>
            </div>
            <div style={styles.icon}>
              {n.type === "like" && "❤️"}
              {n.type === "comment" && "💬"}
              {n.type === "follow" && "➕"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f3f2ef",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  list: {
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: "10px",
    padding: "0.8rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "0.8rem",
  },
  textContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontSize: "0.95rem",
    marginBottom: "0.2rem",
  },
  time: {
    fontSize: "0.8rem",
    color: "#888",
  },
  icon: {
    fontSize: "1.2rem",
    marginLeft: "0.5rem",
  },
};

export default Notifications;
