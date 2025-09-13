import React, { useState } from 'react';
import flogo from '../../../public/assets/img/full-logo.png'; // Importing the logo image
import '../../styles/landingPage/navbar.scss'; // Importing the Navbar's CSS
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  const closeMenu = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };
 const navigate = useNavigate();
  return (
    <nav className="navbar">
      <a href="#Home">
        <div className="logo">
        <img src={flogo} alt="Logo" /> {/* Assuming you still want the logo here */}
      </div>
      </a>
      <div className={`hamburger ${menuOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#Home" onClick={closeMenu}>Home</a></li>
        <li><a href="#Uvp" onClick={closeMenu}>About</a></li>
        <li><a href="#Features" onClick={closeMenu}>Features</a></li>
        <li><a href="#reviews" onClick={closeMenu}>Testimonials</a></li>
        <li><a href="#cta" onClick={closeMenu}>Create</a></li>
        <li><button className="login-button" onClick={() => navigate("/login")}>Login</button></li>
        <li><button className="join-button" onClick={() => navigate("/signup")}>Sign Up</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;