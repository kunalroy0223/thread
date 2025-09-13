/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../styles/landingPage/uvpcard.scss'; // Make sure this file contains your .e-card, .pulse, etc. styles
import Discover from '../../../public/assets/gif/discover.gif'; // Importing the logo image

const UvpCard2 = () => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="pulse"></div>
      <div className="pulse"></div>
      <div className="pulse"></div>

      <div className="infotop">
            <div class="card-image">
                <img src={Discover} alt="discover-gif"/>
            </div>
            <div class="card-title">
                <p>Discoverable</p>
            </div>
        <br />
        <div className="name">Make your writing SEO-friendly and easy to find — no more posts buried or forgotten</div>
      </div>
    </div>
  );
};

export default UvpCard2;
