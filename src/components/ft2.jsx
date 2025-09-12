/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import "../styles/ftl.scss";
import Discover from "/assets/video/discover.mp4";

const Feature2 = () => {
  return (
    <section className="feature-row">
      <div className="feature-video">
        <video src={Discover} autoPlay loop muted />
      </div>

      <div className="feature-text">
        <h2>Discoverable <span>Content</span> </h2>
        <p>
          Keep your posts visible and easy to find with SEO-friendly features
        </p>
      </div>
    </section>
  );
};

export default Feature2;
