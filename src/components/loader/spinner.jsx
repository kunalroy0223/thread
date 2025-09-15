import React from "react";
import "../../styles/loader/spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="spinner-dot"></div>
      ))}
    </div>
  );
};

export default Spinner;
