import React from "react";
import '../styles/herocontent.scss'; // Assuming the CSS file is in the same directory

const HeroContent = () => {
  return (
        <div className="hero-container">
            <h1 class="hero-title">
            Elevate Your 
            <span> Stories</span>
        </h1>
        <p className="hero-subtitle">
            Feeling like your stories fade away? Thread creates space where they can connect and grow</p>
        <div className="cta-buttons">
            <a href="#register" class="cta-primary">Register Now</a>
            <a href="#learn" class="cta-secondary">Learn More</a>
        </div>
        </div>
  );
};

export default HeroContent;
