/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../../styles/landingPage/uvp.scss'; // Assuming the CSS file is in the same directory
import UvpCard1 from './uvpcard1';
import UvpCard2 from './uvpcard2';
import UvpCard3 from './uvpcard3';
import UvpCard4 from './uvpcard4';


const Uvp = () => {
  return (
    <section className="Uvp" id="Uvp">
        <div className="uvp-container">
            <h1 class="uvp-title">
                Why Choose  
                <span> Thread?</span>
            </h1>
             <p className="uvp-subtitle">
                Because your ideas deserve more than just another blog post
            </p> 
        </div>
        <div className="card-container">
            <UvpCard1 />
            <UvpCard2 />
            <UvpCard3 />
            <UvpCard4 />
        </div>

    </section>
  );
};

export default Uvp;