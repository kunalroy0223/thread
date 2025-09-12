/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import "../styles/ftr.scss";
import Networking from "/assets/video/networking.mp4";

const Feature1 = () => {
  return (
<section className="feature-row reverse">
    <div className="feature-video">
    <video src={Networking} autoPlay loop muted />
  </div>
  <div className="feature-text">
    <h2>Connected <span>Posts</span></h2>
    <p>
      Link your ideas together so readers can explore your full story</p>
  </div>
</section>

  );
};

export default Feature1;
