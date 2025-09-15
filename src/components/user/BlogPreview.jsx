import React from "react";
import "../../styles/user/BlogPreview.scss";

const BlogPreview = ({ blogData, onPrev, onPost }) => {
  return (
    <div className="preview-wrapper">
      <div className="preview-container">
        <h1 className="preview-title">{blogData.title}</h1>
        <hr className="divider" />
        {blogData.subtitle && <h3 className="preview-subtitle">{blogData.subtitle}</h3>}
        <hr className="divider" />

        <div className="preview-content-scroll">
          <div className="preview-content">{blogData.content}</div>

          <div className="preview-media">
            {blogData.mediaList.map((media, i) => (
              <div key={i} className="media-wrapper">
                {media.type === "image" ? (
                  <img src={URL.createObjectURL(media.file)} alt="" />
                ) : (
                  <video controls>
                    <source src={URL.createObjectURL(media.file)} type={media.file.type} />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="preview-buttons">
        <button className="prev-btn" onClick={onPrev}>Prev</button>
        <button className="post-btn" onClick={() => onPost && onPost(blogData)}>Post</button>
      </div>

    </div>
  );
};

export default BlogPreview;
