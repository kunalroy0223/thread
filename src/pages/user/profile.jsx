import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/sidebar";
import "../../styles/user/profile.scss";
import { getUserByEmail } from "../../../backend/methods/GetUser"; // updated import
import { getUserPosts } from "../../../backend/methods/GetPosts";
import { useAuth } from "../../context/authContext.jsx";

const ProfilePosts = ({ posts }) => (
  <section className="profile-posts-container">
    <div className="profile-posts-grid">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="profile-post"
            style={{ backgroundImage: `url(${post.coverImage || post.img})` }}
          />
        ))
      ) : (
        <p className="no-posts">No posts yet.</p>
      )}
    </div>
  </section>
);

const Profile = () => {
  const { user: currentUser, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const [userResult, postsResult] = await Promise.all([
          getUserByEmail(currentUser.email), // fetch by email
          getUserPosts(currentUser.id),
        ]);

        if (userResult.success) setUser(userResult.data);
        if (postsResult.success) setPosts(postsResult.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authLoading, currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (authLoading || loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="profile-page-container">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <div className="avatar">
            <img src={user.avatar || "https://picsum.photos/150/150?face"} alt={user.username} />
          </div>

          <div className="profile-details">
            <div className="name-role">
              <h2>{user.username}</h2>
              <span className="role">{user.role || "Photographer & Traveler"}</span>
            </div>

            <div className="stats-buttons">
              <div className="stats">
                <div><strong>{posts.length}</strong> posts</div>
                <div><strong>{user.followers?.length || 0}</strong> followers</div>
                <div><strong>{user.following?.length || 0}</strong> following</div>
              </div>

              <div className="buttons">
                <button className="edit-btn">Edit Profile</button>
                <button className="share-btn">Share Profile</button>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>

        <ProfilePosts posts={posts} />
      </div>
    </div>
  );
};

export default Profile;
