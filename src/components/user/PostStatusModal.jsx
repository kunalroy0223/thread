import React, { useEffect, useState } from "react";
import Spinner from "../loader/spinner"; // import your spinner component
import "../../styles/user/PostStatusModal.scss";

const PostStatusModal = ({ isOpen, status, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setShowSpinner(true);
      const timer = setTimeout(() => setShowSpinner(false), 3000); // 3 sec spinner
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="post-status-overlay">
      <div className="post-status-modal">
        {showSpinner ? (
          <div className="spinner-wrapper">
            {/* ✅ Wrap spinner in container for proper alignment */}
            <div className="spinner-container">
              <Spinner />
            </div>
            <p className="posting-text">Posting your blog...</p> {/* unique class */}
          </div>
        ) : (
          <div className="status-result">
            <img
              src={status === "success" ? "/assets/gif/correct.gif" : "/assets/gif/wrong.png"}
              alt={status}
              className="status-icon"
            />
            <p className="status-message">
              {status === "success"
                ? "Blog posted successfully!"
                : "Failed to post blog"}
            </p>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostStatusModal;
