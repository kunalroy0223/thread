import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/user/sidebar.scss"; // keep using your extracted CSS

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("home");

  // Update active based on current URL
  useEffect(() => {
    const path = location.pathname.replace("/", "") || "home";
    setActive(path);
  }, [location]);

  const handleNavigation = (page) => {
    setActive(page);
    navigate(`/${page}`);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // You can add your actual logout logic here
  };

  return (
    <nav className="sidebar">
      <div className="menu">
        <div
          className={`menu-item ${active === "home" ? "active" : ""}`}
          onClick={() => handleNavigation("home")}
        >
          {/* Home icon */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
            />
          </svg>
          <span>Home</span>
        </div>

        <div
          className={`menu-item ${active === "search" ? "active" : ""}`}
          onClick={() => handleNavigation("search")}
        >
          {/* Search icon */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
            />
          </svg>
          <span>Search</span>
        </div>

        <div
          className={`menu-item ${active === "post" ? "active" : ""}`}
          onClick={() => handleNavigation("create")}
        >
          {/* Create icon */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Create</span>
        </div>

        <div
          className={`menu-item ${active === "profile" ? "active" : ""}`}
          onClick={() => handleNavigation("profile")}
        >
          {/* Profile icon */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14c-3.866 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z"
            />
            <circle cx="12" cy="8" r="4" />
          </svg>
          <span>Profile</span>
        </div>

        <div
          className={`menu-item ${active === "dm" ? "active" : ""}`}
          onClick={() => handleNavigation("dm")}
        >
          {/* DM icon */}
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
            />
          </svg>
          <span>DM</span>
        </div>
      </div>

      <div className="logout" onClick={handleLogout}>
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" width="22" height="22">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3-3 3m3-3H9"
          />
        </svg>
        <span>Logout</span>
      </div>
    </nav>
  );
}
