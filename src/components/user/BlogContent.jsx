import React, { useState, useEffect } from "react";
import "../../styles/user/BlogContent.scss";

const BlogContent = ({ onPrev, onNext }) => {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [mediaList, setMediaList] = useState([]); // { type, file }
  const [message, setMessage] = useState(""); // <-- new notification state

  const seoSuggestions = [
    "Use keywords in title",
    "Add meta description",
    "Include images/videos",
  ];

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [content]);

  const handleNext = () => {
    if (!content.trim()) {
      setMessage("Content cannot be empty!"); // <-- show notification
      setTimeout(() => setMessage(""), 3000); // hide after 3s
      return;
    }
    onNext({ content, mediaList });
  };

  const handleAddMedia = (type) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : "video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) setMediaList([...mediaList, { type, file }]);
    };
    input.click();
  };

  const handleRemoveMedia = (index) => {
    setMediaList(mediaList.filter((_, i) => i !== index));
  };

  return (
    <div className="blog-content-form-unique987">
      {message && <div className="notification-unique987">{message}</div>} {/* notification div */}

      <h2>Blog Content</h2>

      {/* Tips Button */}
      <button
        className="tips-button-unique987"
        onClick={() => setShowTips(!showTips)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 24 24"
          fill="#FFD700"
        >
          <path d="M9 21h6v-1H9v1zm3-19C7.48 2 4 5.48 4 10c0 3.87 3.13 7 7 7s7-3.13 7-7c0-4.52-3.48-8-7-8zm1 12h-2v-2h2v2z" />
        </svg>
        Tips
      </button>

      {showTips && (
        <div className="tips-popup-unique987">
          <span>
            Tips: Use <code>/image-name</code> or <code>/video-name</code> to
            insert media, <code>&lt;h2&gt;Subtitle&lt;/h2&gt;</code> for new
            subtitles.
          </span>
          <button
            className="tips-close-button-unique987"
            onClick={() => setShowTips(false)}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#FF6F00"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      )}

      <textarea
        placeholder="Write your content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="word-count-unique987">Word Count: {wordCount}</div>

      <div className="seo-suggestions-unique987">
        {seoSuggestions.map((tip, i) => (
          <div key={i} className="seo-tip-unique987">
            {tip}
          </div>
        ))}
      </div>

      {/* Media Upload Section */}
      <div className="media-upload-unique987">
        <div className="add-buttons-unique987">
          <button
            className="add-image-button-unique987"
            onClick={() => handleAddMedia("image")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Image
          </button>
          <button
            className="add-video-button-unique987"
            onClick={() => handleAddMedia("video")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Video
          </button>
        </div>

        <div className="uploaded-media-unique987">
          {mediaList.map((media, index) => (
            <div key={index} className="media-item-unique987">
              <span className="file-name-unique987">
                {media.file.name}
                <button
                  className="remove-media-button-unique987"
                  onClick={() => handleRemoveMedia(index)}
                >
                  <img
                    src="/assets/icons/minus.png"
                    alt="Remove"
                    width={12}
                    height={12}
                  />
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="nav-buttons-unique987">
        <button className="prev-button-unique987" onClick={onPrev}>
          Prev
        </button>
        <button className="next-button-unique987" onClick={handleNext}>
          Next
        </button>
      </div>

    </div>
  );
};

export default BlogContent;
