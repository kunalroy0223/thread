/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import "../../styles/landingPage/ftr.scss";
import Custom from "../../../public/assets/video/custom.mp4";

const Feature5 = () => {
  return (
<section className="feature-row reverse">
      <div className="feature-video">
    <video src={Custom} autoPlay loop muted />
  </div>
  <div className="feature-text">
    <h2>Custom  <span>Branding</span></h2>
    <p>
     Make your blog unique with customizable themes, fonts, and styles
    </p>
  </div>
</section>

  );
};

export default Feature5;
