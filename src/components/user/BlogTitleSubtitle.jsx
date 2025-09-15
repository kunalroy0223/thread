import React, { useState } from "react";
import "../../styles/user/BlogTitleSubtitle.scss";

const BlogTitleSubtitle = ({ onNext, onPrev }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    let currentErrors = {};
    if (!title.trim()) {
      currentErrors.title = "Title is required!";
    }
    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      onNext({ title, subtitle });
    }
  };

  return (
    <div className="blog-form">
      <h2>Blog Details</h2>

      <input
        type="text"
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <div className="error-msg">{errors.title}</div>}

      <input
        type="text"
        placeholder="Enter Subtitle (optional)"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <div className="nav-buttons">
        <button className="prev-btn" onClick={onPrev}>
          Prev
        </button>
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogTitleSubtitle;
