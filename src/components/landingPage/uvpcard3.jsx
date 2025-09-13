/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../styles/landingPage/uvpcard.scss'; // Make sure this file contains your .e-card, .pulse, etc. styles
import Engage from '../../../public/assets/gif/engagement.gif'; // Importing the logo image

const UvpCard3 = () => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="pulse"></div>
      <div className="pulse"></div>
      <div className="pulse"></div>

      <div className="infotop">
            <div class="card-image">
                <img src={Engage} alt="engagement-gif"/>
            </div>
            <div class="card-title">
                <p>Interactive</p>
            </div>       
        <br />
        <div className="name">Boost audience engagement with threaded conversations, replies, and sharing built in</div>
      </div>
    </div>
  );
};

export default UvpCard3;
