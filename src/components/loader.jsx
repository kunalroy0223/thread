/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import '../styles/loader.scss'; // Assuming the CSS file is in the same directory


const Loader = () => {
  return (
    <div className="loader-container">
        <div className="page">
            <div className="container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="h3">Loading</div>
            </div>
        </div>
    </div>
  );
};

export default Loader;