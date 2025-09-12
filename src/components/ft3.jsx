/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import "../styles/ftr.scss";
import Engage from "/assets/video/engagement.mp4";

const Feature3 = () => {
  return (
<section className="feature-row reverse">
      <div className="feature-video">
    <video src={Engage} autoPlay loop muted />
  </div>
  <div className="feature-text">
    <h2>Audience  <span>Engagement</span></h2>
    <p>
      Spark real conversations with built-in comments, replies, and sharing
    </p>
  </div>
</section>

  );
};

export default Feature3;
