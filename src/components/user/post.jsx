import React, { useState, useRef, useEffect } from "react";
import "../../styles/user/post.scss";
import Comment from "./comment";
import CommentDrawer from "./commentDrawer";
import { getPosts } from "../../../backend/methods/GetPosts";
import { getAnalytics } from "../../../backend/methods/GetAnalytics";
import { postAnalytics } from "../../../backend/methods/PostAnalytics";

// ✅ Use the custom hook instead of context directly
import { useAuth } from "../../context/authContext.jsx";

const Post = () => {
  const { user: currentUser } = useAuth(); // dynamically get logged-in user
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [readMorePosts, setReadMorePosts] = useState({});
  const [currentMediaPosts, setCurrentMediaPosts] = useState({});
  const [isCommentsOpen, setCommentsOpen] = useState({});
  const [isMenuOpen, setMenuOpen] = useState({});
  const [analyticsMap, setAnalyticsMap] = useState({}); // postId => { likes, comments }

  const carouselRefs = useRef({});
  const touchStartX = useRef({});
  const touchEndX = useRef({});

  // Fetch posts + analytics
  useEffect(() => {
    const fetchPostsAndAnalytics = async () => {
      const result = await getPosts();
      if (result.success) {
        setPosts(result.data);

        const analyticsObj = {};
        await Promise.all(
          result.data.map(async (post) => {
            const analyticsResult = await getAnalytics(post.id);
            analyticsObj[post.id] = analyticsResult.success
              ? {
                  likes: analyticsResult.data.likes || 0,
                  comments: analyticsResult.data.comments || 0,
                }
              : { likes: 0, comments: 0 };
          })
        );
        setAnalyticsMap(analyticsObj);
      } else {
        console.error("Failed to fetch posts:", result.error);
      }
    };

    fetchPostsAndAnalytics();
  }, []);

  // Toggle like/unlike
  const toggleLike = async (postId) => {
    if (!currentUser) return; // can't like if not logged in

    const currentlyLiked = likedPosts[postId] || false;

    setLikedPosts((prev) => ({ ...prev, [postId]: !currentlyLiked }));
    setAnalyticsMap((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        likes: (prev[postId]?.likes || 0) + (currentlyLiked ? -1 : 1),
      },
    }));

    try {
      await postAnalytics(postId, { likes: currentlyLiked ? -1 : 1, userId: currentUser.id });
    } catch (err) {
      console.error("Error updating analytics:", err);
      setLikedPosts((prev) => ({ ...prev, [postId]: currentlyLiked }));
      setAnalyticsMap((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          likes: (prev[postId]?.likes || 0) + (currentlyLiked ? 1 : -1),
        },
      }));
    }
  };

  // ... rest of your functions (carousel, readMore, touch, comment) remain unchanged
  const toggleReadMore = (id) => setReadMorePosts((prev) => ({ ...prev, [id]: !prev[id] }));
  const prevMedia = (id, mediaLength) => {
    const newIndex = currentMediaPosts[id] === 0 ? mediaLength - 1 : currentMediaPosts[id] - 1;
    setCurrentMediaPosts((prev) => ({ ...prev, [id]: newIndex }));
    slideTo(id, newIndex);
  };
  const nextMedia = (id, mediaLength) => {
    const newIndex = currentMediaPosts[id] === mediaLength - 1 ? 0 : currentMediaPosts[id] + 1;
    setCurrentMediaPosts((prev) => ({ ...prev, [id]: newIndex }));
    slideTo(id, newIndex);
  };
  const slideTo = (id, index) => {
    const width = carouselRefs.current[id]?.clientWidth || 0;
    if (carouselRefs.current[id]) carouselRefs.current[id].style.transform = `translateX(-${width * index}px)`;
  };
  const handleDoubleClick = (id) => {
    toggleLike(id);
    const heart = document.querySelector(`#heart-${id}`);
    if (heart) {
      heart.style.transform = "translate(-50%, -50%) scale(1)";
      heart.style.opacity = "1";
      setTimeout(() => {
        heart.style.transform = "translate(-50%, -50%) scale(0)";
        heart.style.opacity = "0";
      }, 600);
    }
  };
  const handleTouchStart = (e, id) => (touchStartX.current[id] = e.touches[0].clientX);
  const handleTouchMove = (e, id) => (touchEndX.current[id] = e.touches[0].clientX);
  const handleTouchEnd = (id, mediaLength) => {
    const delta = touchStartX.current[id] - touchEndX.current[id];
    if (Math.abs(delta) > 50) (delta > 0 ? nextMedia : prevMedia)(id, mediaLength);
  };
  const handleCommentUpdate = (postId, newCount) => {
    setAnalyticsMap((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        comments: newCount,
      },
    }));
  };

  return (
    <section className="blog-section">
      {posts.map((post) => {
        const postId = post.id;
        const media = post.mediaList || [];
        const liked = likedPosts[postId] || false;
        const readMore = readMorePosts[postId] || false;
        const menuOpen = isMenuOpen[postId] || false;
        const analytics = analyticsMap[postId] || { likes: 0, comments: 0 };

        return (
          <div key={postId} className="blog-post">
            {/* Header */}
            <div className="post-header">
              <img
                src={post.authorProfile || "https://randomuser.me/api/portraits/women/68.jpg"}
                alt="Profile Pic"
                className="profile-pic"
              />
              <div className="user-info">
                <span className="p-name">{post.authorName || "Anonymous"}</span>
                <span className="time">{post.createdAt?.toDate()?.toLocaleString() || "Just now"}</span>
              </div>

              {/* 3-Dots Menu */}
              <div className="post-menu-wrapper">
                <button className="dots-btn" onClick={() => setMenuOpen((prev) => ({ ...prev, [postId]: !prev[postId] }))}>
                  <svg className={`dots-svg-${postId}`} xmlns="http://www.w3.org/2000/svg" fill="#333" viewBox="0 0 24 24" width="20" height="20">
                    <circle cx="5" cy="12" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="19" cy="12" r="2" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="post-menu-dropdown">
                    <div onClick={() => alert("Save clicked")}>Save</div>
                    <div onClick={() => alert("Report clicked")}>Report</div>
                    <div onClick={() => alert("Not Interested clicked")}>Not Interested</div>
                  </div>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="post-title">{post.title}</div>
            <div className="post-subtitle">{post.subtitle}</div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="post-cover">
                <img src={post.coverImage} alt="Cover" className="cover-image" />
              </div>
            )}

            {/* Content */}
            <div className="post-content">{readMore ? post.content : post.content?.substring(0, 150) + "..."}</div>

            <button className="read-more-btn" onClick={() => toggleReadMore(postId)}>
              {readMore ? "View Less" : "Read More"}
            </button>

            {(post.coverImage || media.length > 0) && <hr />}

            {/* Media Carousel */}
            {media.length > 0 && (
              <div
                className="post-media"
                onDoubleClick={() => handleDoubleClick(postId)}
                onTouchStart={(e) => handleTouchStart(e, postId)}
                onTouchMove={(e) => handleTouchMove(e, postId)}
                onTouchEnd={() => handleTouchEnd(postId, media.length)}
              >
                <div className="carousel-container">
                  <div className="carousel-wrapper" ref={(el) => (carouselRefs.current[postId] = el)}>
                    {media.map((m, index) => (
                      <div key={index} className="media-item">
                        {m.type === "image" ? <img src={m.url} alt={`media-${index}`} /> : <video src={m.url} controls />}
                      </div>
                    ))}
                  </div>

                  {media.length > 1 && (
                    <>
                      <button className={`carousel-prev-${postId}`} onClick={() => prevMedia(postId, media.length)}>
                        &lt;
                      </button>
                      <button className={`carousel-next-${postId}`} onClick={() => nextMedia(postId, media.length)}>
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="post-actions">
              <button className={`like-btn ${liked ? "liked" : ""}`} onClick={() => toggleLike(postId)}>
                  <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"

                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                <span>{analytics.likes} Likes</span>
              </button>
              <button onClick={() => setCommentsOpen((prev) => ({ ...prev, [postId]: true }))}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                <span>{analytics.comments} Comments</span>
              </button>
              <button onClick={() => alert("Share this post!")}>
                  <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.027 10.9a8.729 8.729 0 0 1 6.422-3.62v-1.2A2.061 2.061 0 0 1 12.61 4.2a1.986 1.986 0 0 1 2.104.23l5.491 4.308a2.11 2.11 0 0 1 .588 2.566 2.109 2.109 0 0 1-.588.734l-5.489 4.308a1.983 1.983 0 0 1-2.104.228 2.065 2.065 0 0 1-1.16-1.876v-.942c-5.33 1.284-6.212 5.251-6.25 5.441a1 1 0 0 1-.923.806h-.06a1.003 1.003 0 0 1-.955-.7A10.221 10.221 0 0 1 5.027 10.9Z" />
                    </svg>
                <span>Share</span>
              </button>
            </div>

            {/* Comments */}
            <Comment postId={postId} currentUser={currentUser} onCommentAdded={(newCount) => handleCommentUpdate(postId, newCount)} />
            <CommentDrawer
              postId={postId}
              currentUser={currentUser}
              isOpen={isCommentsOpen[postId] || false}
              onClose={() => setCommentsOpen((prev) => ({ ...prev, [postId]: false }))}
              onCommentAdded={(newCount) => handleCommentUpdate(postId, newCount)}
            />
          </div>
        );
      })}
    </section>
  );
};

export default Post;
