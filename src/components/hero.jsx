/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import HeroContent from './herocontent';
import '../styles/hero.scss'; // Assuming the CSS file is in the same directory


const Hero = () => {
  return (
    <section id="Home">
     <div className="wavy-section">       
        <div className="content">
            <HeroContent />
        </div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
    </div>
    
</section>
  );
};

export default Hero;