/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../styles/uvpcard.scss'; // Make sure this file contains your .e-card, .pulse, etc. styles
import Efficient from '/assets/gif/efficiency.gif'; // Importing the logo image

const UvpCard4 = () => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="pulse"></div>
      <div className="pulse"></div>
      <div className="pulse"></div>

      <div className="infotop">
            <div class="card-image">
                <img src={Efficient} alt="efficiency-gif"/>
            </div>
            <div class="card-title">
                <p>Instant</p>
            </div>    
        Instant
        <br />
        <div className="name">Start publishing in seconds with a blogging platform that needs zero setup.</div>
      </div>
    </div>
  );
};

export default UvpCard4;
