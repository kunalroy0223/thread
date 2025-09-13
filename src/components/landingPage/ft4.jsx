/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import "../../styles/landingPage//ftl.scss";
import Instant from "../../../public/assets/video/instant.mp4";

const Feature4 = () => {
  return (
    <section className="feature-row">
      <div className="feature-video">
        <video src={Instant} autoPlay loop muted />
      </div>

      <div className="feature-text">
        <h2>Easy  <span>Publishing</span> </h2>
        <p>
          Start blogging instantly — no setup, plugins, or hassle required
        </p>
      </div>
    </section>
  );
};

export default Feature4;
