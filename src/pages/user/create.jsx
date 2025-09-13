import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import "../../styles/user/create.scss";

const Create = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [tags, setTags] = useState("");
  const [suggestions, setSuggestions] = useState([
    { title: "SEO Title Length", text: "Your title is too short. Try making it 50–60 characters.", score: 40 },
    { title: "Meta Description", text: "Good description! Keep it under 160 characters.", score: 90 },
  ]);

  const addContentBlock = (type) => {
    if (type === "text") setContent([...content, { type: "text", value: "" }]);
    if (type === "image") setContent([...content, { type: "image", value: "" }]);
    if (type === "video") setContent([...content, { type: "video", value: "" }]);
  };

  const handleContentChange = (index, value) => {
    const updated = [...content];
    updated[index].value = value;
    setContent(updated);
  };

  const handleContentMedia = (index, file) => {
    const updated = [...content];
    updated[index].value = URL.createObjectURL(file);
    setContent(updated);
  };

  const handleSubmit = () => {
    const post = {
      title,
      subtitle,
      content,
      images,
      videos,
      seoTitle,
      seoDescription,
      tags: tags.split(",").map((t) => t.trim()),
    };
    console.log("Post created:", post);
    alert("Post created! Check console for data.");
  };

  return (
    <div className="create-page-container">
      <Sidebar />
      <div className="create-content">
        <h2 className="create-heading">Create a New Blog Post</h2>

        {/* Title & Subtitle */}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-input title-input"
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="create-input subtitle-input"
        />

        {/* Content Editor */}
        <div className="content-editor">
          <div className="editor-toolbar">
            <button title="Add Text" onClick={() => addContentBlock("text")}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M4 4h16v2H4V4zm0 4h12v2H4V8z" fill="currentColor" />
              </svg>
            </button>
            <button title="Add Image" onClick={() => addContentBlock("image")}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14h18zm-2-5l-3-4-4 5H5l4-5 3 4 4-5z" fill="currentColor"/>
              </svg>
            </button>
            <button title="Add Video" onClick={() => addContentBlock("video")}>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4V6.5l-4 4z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {content.map((block, index) => (
            <div className="content-block" key={index}>
              {block.type === "text" && (
                <textarea
                  placeholder="Write text..."
                  value={block.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="create-textarea"
                />
              )}
              {block.type === "image" && (
                <div className="media-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleContentMedia(index, e.target.files[0])}
                  />
                  {block.value && <img src={block.value} alt="block-img" className="preview-image media-responsive" />}
                </div>
              )}
              {block.type === "video" && (
                <div className="media-block">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleContentMedia(index, e.target.files[0])}
                  />
                  {block.value && <video src={block.value} controls className="preview-video media-responsive" />}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SEO Tools */}
        <div className="seo-section">
          <h3>SEO Settings</h3>
          <input
            type="text"
            placeholder="SEO Title"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="create-input seo-input"
          />
          <textarea
            placeholder="SEO Description"
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="create-textarea seo-textarea"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="create-input seo-input"
          />

          {/* Suggestions Dashboard */}
          <div className="suggestions-dashboard">
            {suggestions.map((s, i) => (
              <div className="suggestion-card" key={i}>
                <div className="card-title">{s.title}</div>
                <div className="card-text">{s.text}</div>
                <div className={`card-score ${s.score > 70 ? "good" : "warning"}`}>
                  Score: {s.score}/100
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default Create;
