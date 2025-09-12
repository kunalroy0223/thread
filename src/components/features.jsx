/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../styles/features.scss'; // Assuming the CSS file is in the same directory
import Feature1 from './ft1';
import Feature2 from './ft2';
import Feature3 from './ft3';
import Feature4 from './ft4';
import Feature5 from './ft5';

const Features = () => {
  return (
    <section className='ft-section' id="Features">
        <div className="ft-container">
            <h1 class="ft-title">
                Blog Smarter 
                <span> Today</span>
            </h1>
             <p className="ft-subtitle">
                Everything you need to publish effortlessly, connect posts, and grow your audience
            </p> 
        </div>
        <div className="ft-content-container">
            <Feature1 />
            <Feature2 />
            <Feature3 />
            <Feature4 />
            <Feature5 />
        </div>
    
    </section>
  );
};

export default Features;