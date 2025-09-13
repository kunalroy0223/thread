import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/user/post.scss";
import Comment from "./comment";
import CommentDrawer from "./commentDrawer";
const Post = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(0);

  const [likesCount, setLikesCount] = useState(24);
  const [commentsCount, setCommentsCount] = useState(12);
  const [sharesCount, setSharesCount] = useState(5);

  const media = [
    { type: "image", src: "https://picsum.photos/600/400?1" },
    { type: "image", src: "https://picsum.photos/600/400?2" },
    { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" }
  ];

  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };
  const toggleReadMore = () => setReadMore(!readMore);
const [isCommentsOpen, setCommentsOpen] = useState(false);

const commentPost = () => setCommentsOpen(true);  const sharePost = () => alert("Share this post!");

  const prevMedia = () => {
    const newIndex = currentMedia === 0 ? media.length - 1 : currentMedia - 1;
    setCurrentMedia(newIndex);
    slideTo(newIndex);
  };

  const nextMedia = () => {
    const newIndex = currentMedia === media.length - 1 ? 0 : currentMedia + 1;
    setCurrentMedia(newIndex);
    slideTo(newIndex);
  };

  const slideTo = (index) => {
    const width = carouselRef.current.clientWidth;
    carouselRef.current.style.transform = `translateX(-${width * index}px)`;
  };

  const handleDoubleClick = () => {
    if (!liked) toggleLike();
    const heart = document.querySelector(".double-tap-heart");
    heart.style.transform = "translate(-50%, -50%) scale(1)";
    heart.style.opacity = "1";
    setTimeout(() => {
      heart.style.transform = "translate(-50%, -50%) scale(0)";
      heart.style.opacity = "0";
    }, 600);
  };

  // 👇 SWIPE HANDLERS for touch devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      // threshold: swipe must be >50px
      if (delta > 0) {
        nextMedia(); // swipe left → next
      } else {
        prevMedia(); // swipe right → prev
      }
    }
  };

  return (
    <section className="blog-section">
      <div className="blog-post">
        {/* Header */}
        <div className="post-header">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Profile Pic"
            className="profile-pic"
          />
          <div className="user-info">
            <span className="p-name">Jane Doe</span>
            <span className="time">2 hours ago</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="post-title">My Journey Into Web Development</div>
        <div className="post-subtitle">
          How I learned to code and build responsive web apps
        </div>
        <hr />

        {/* Content */}
        <div className="post-content">
          {readMore
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nunc non ultricies fringilla, nisi metus tincidunt leo, ut consequat lorem libero non justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer laoreet, sapien at sollicitudin lacinia, velit nulla suscipit nulla, non fermentum erat velit non justo. Cras vitae lorem lorem."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod, nunc non ultricies fringilla, nisi metus tincidunt leo, ut consequat lorem libero non justo..."}
        </div>

        {/* Read More */}
        <button className="read-more-btn" onClick={toggleReadMore}>
          {readMore ? "View Less" : "Read More"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {readMore ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5M19 18H5M19 6H5"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            )}
          </svg>
        </button>

        {/* Media Carousel */}
        <div
          className="post-media"
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-container">
            <div className="carousel-wrapper" ref={carouselRef}>
              {media.map((m, index) => (
                <div key={index} className="media-item">
                  {m.type === "image" ? (
                    <img src={m.src} alt={`media-${index}`} />
                  ) : (
                    <video src={m.src} controls />
                  )}
                </div>
              ))}
            </div>

            {/* Arrows */}
            {media.length > 1 && (
              <>
                <button className="carousel-prev" onClick={prevMedia}>
                  &lt;
                </button>
                <button className="carousel-next" onClick={nextMedia}>
                  &gt;
                </button>
              </>
            )}
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {media.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === currentMedia ? "active" : ""}`}
                onClick={() => {
                  setCurrentMedia(i);
                  slideTo(i);
                }}
              ></span>
            ))}
          </div>

          <svg
            className="double-tap-heart"
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Actions */}
        <hr />
        <div className="post-actions">
          <button
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={toggleLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="heart-svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 5 13.5 5 8.5C5 5.46243 7.46243 3 10.5 3C12.2909 3 14 4.70914 14 4.70914C14 4.70914 15.7091 3 17.5 3C20.5376 3 23 5.46243 23 8.5C23 13.5 16 21 16 21H12Z"
              />
            </svg>
            <span>{likesCount} Likes</span>
          </button>
          <button onClick={commentPost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
              />
            </svg>
            <span>{commentsCount} Comments</span>
          </button>
          <button onClick={sharePost}>
            <svg
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15.75 5.125a3.125 3.125 0 1 1 .754 2.035l-8.397 3.9a3.124 3.124 0 0 1 0 1.88l8.397 3.9a3.125 3.125 0 1 1-.61 1.095l-8.397-3.9a3.125 3.125 0 1 1 0-4.07l8.397-3.9a3.125 3.125 0 0 1-.144-.94Z" />
            </svg>
            <span>{sharesCount} Shares</span>
          </button>
        </div>
      </div>
      <Comment />
      <CommentDrawer isOpen={isCommentsOpen} onClose={() => setCommentsOpen(false)} />
    </section>
  );
};

export default Post;
