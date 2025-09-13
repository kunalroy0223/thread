/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../styles/landingPage/uvpcard.scss'; // Make sure this file contains your .e-card, .pulse, etc. styles
import Network from '../../../public/assets/gif/network.gif'; // Importing the logo image

const UvpCard1 = () => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="pulse"></div>
      <div className="pulse"></div>
      <div className="pulse"></div>

      <div className="infotop">         
            <div class="card-image">
                <img src={Network} alt="network-gif"/>
            </div>
            <div class="card-title">
                <p>Networked</p>
            </div>
        <br />
        <div className="name">Turn your blog into a connected content network that keeps readers exploring related posts</div>
      </div>
    </div>
  );
};

export default UvpCard1;
