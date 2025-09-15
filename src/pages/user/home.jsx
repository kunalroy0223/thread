import React from "react";
import "../../styles/user/home.scss"; // Import the CSS file for styling
import Sidebar from "../../components/user/sidebar";
import Post from "../../components/user/post";
import flogo from '../../../public/assets/img/full-logo.png'; // Importing the logo image
import { useNavigate } from "react-router-dom";


const Home = () => {
      const handleLogoClick = () => navigate("/home");
      const navigate = useNavigate();
      const notificationsPage = () => navigate("/notifications");

  return (
    <>
      {/* Sidebar on the left */}
      <Sidebar />
      {/* Full-width Header */}
      <header>
        <div className="h-logo">
          <img
            src={flogo}
            alt="logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="notifications" onClick={notificationsPage}>
          {/* Bell SVG */}
          <svg fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
            />
          </svg>
        </div>
      </header>

      {/* Post Creator Card */}
      <div className="post-creator">
        {/* Profile + username */}
        <div className="h-row">
          <img src="https://via.placeholder.com/50" alt="profile" />
          <span className="username">John Doe</span>
        </div>

        {/* Textarea */}
        <div className="h-row">
          <textarea rows="3" placeholder="What's on your mind?"></textarea>
        </div>

        {/* Action icons */}
        <div className="h-icons">
          {/* Photo SVG */}
          <svg fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18v18H3V3zM7 7h1v1H7V7zm4 0h6v6h-6V7z"
            />
          </svg>

          {/* Video SVG */}
          <svg fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10l4-3v10l-4-3v-4zM3 5h12v14H3V5z"
            />
          </svg>

          {/* Emoji SVG */}
          <svg fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 14s1.5 2 4 2 4-2 4-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 9h.01M15 9h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    <main>
        <Post />
      </main>
    </>
  );
};

export default Home;
