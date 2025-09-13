import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/landingPage/herocontent.scss";

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <h1 className="hero-title">
        Elevate Your <span> Stories</span>
      </h1>

      <p className="hero-subtitle">
        Feeling like your stories fade away? Thread creates space where they can connect and grow
      </p>

      <div className="cta-buttons">
        <a href="#register" className="cta-primary" onClick={() => navigate("/signup")}>
          Register Now
        </a>

        {/* ✅ navigate on click */}
        <button className="cta-secondary" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
