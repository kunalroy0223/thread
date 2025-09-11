import React, { useState } from 'react';
import flogo from '/assets/img/full-logo.png'; // Importing the logo image
import '../styles/navbar.scss'; // Importing the Navbar's CSS

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  const closeMenu = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

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
        <li><a href="#About" onClick={closeMenu}>About</a></li>
        <li><a href="#Skills" onClick={closeMenu}>Skills</a></li>
        <li><a href="#Experience" onClick={closeMenu}>Experience</a></li>
        <li><button className="login-button" onClick={closeMenu}>Projects</button></li>
        <li><button className="join-button" onClick={closeMenu}>Contact</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;