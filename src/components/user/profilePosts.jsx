import React from "react";
import "../../styles/user/profilePosts.scss";

const ProfilePosts = ({ posts }) => {
  return (
    <section className="profile-posts-container">
      <div className="profile-posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="profile-post"
              style={{ backgroundImage: `url(${post.img})` }}
            ></div>
          ))
        ) : (
          <p className="no-posts">No posts yet.</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePosts;
