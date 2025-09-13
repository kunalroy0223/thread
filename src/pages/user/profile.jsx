import React, { useState } from "react";
import Sidebar from "../../components/user/sidebar";
import Post from "../../components/user/post";
import Masonry from "react-masonry-css"; // for masonry layout
import "../../styles/user/profile.scss";

const Profile = () => {
  const [posts, setPosts] = useState([
    { id: 1, img: "https://picsum.photos/300/400?random=1" },
    { id: 2, img: "https://picsum.photos/300/250?random=2" },
    { id: 3, img: "https://picsum.photos/300/350?random=3" },
    { id: 4, img: "https://picsum.photos/300/300?random=4" },
    { id: 5, img: "https://picsum.photos/300/450?random=5" },
    { id: 6, img: "https://picsum.photos/300/320?random=6" },
    { id: 7, img: "https://picsum.photos/300/400?random=7" },
    { id: 8, img: "https://picsum.photos/300/280?random=8" },
    { id: 9, img: "https://picsum.photos/300/360?random=9" },
  ]);

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    480: 1
  };

  return (
    <div className="profile-page-container">
      <Sidebar />

      <div className="profile-content">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="avatar">
            <img src="https://picsum.photos/150/150?face" alt="Profile" />
          </div>

          <div className="profile-details">
            <div className="name-role">
              <h2>John Doe</h2>
              <span className="role">Photographer & Traveler</span>
            </div>

            <div className="stats-buttons">
              <div className="stats">
                <div><strong>120</strong> posts</div>
                <div><strong>2.5k</strong> followers</div>
                <div><strong>300</strong> following</div>
              </div>

              <div className="buttons">
                <button className="edit-btn">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#fff"/>
                  </svg>
                  Edit Profile
                </button>
                <button className="share-btn">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14" stroke="#fff" strokeWidth="2" fill="none"/>
                  </svg>
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Posts */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="posts-grid"
          columnClassName="posts-grid_column"
        >
          {posts.map((post) => (
            <Post key={post.id} img={post.img} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Profile;
