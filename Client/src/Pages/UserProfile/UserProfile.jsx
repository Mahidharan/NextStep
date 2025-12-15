import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "../../assets/defaultavatar.png";
import Navbar from "../../Components/Navbar/Navbar";
import PostCard from "../../Components/Postcard/PostCard";
import { useParams } from "react-router-dom";
import { api } from "../../API/axios.js";
import Loader from "../../Components/Loader/Loader.jsx";

function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchedProfile = async () => {
      try {
        //Fetching User
        const userRes = await api.get(`/user/profile/${userId}`);
        setUser(userRes.data.data);

        //Fetching Post
        const postRes = await api.get(`/post/user/${userId}`);
        setPost(postRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchedProfile();
  }, [userId]);

  if (loading) return <Loader />;
  if (!user) return <p>User not found</p>;

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <div className="user-header">
          <img src={user.avatar.url} alt="" className="user-avatar" />
          <div className="user-info">
            <h2>{user.name}</h2>
            <p className="username">@{user.username}</p>
            <p className="bio"> {user.bio} </p>
            <a
              href={user.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="linkedin-link"
            >
              View LinkedIn
            </a>
            {user.resumeUrl && (
              <a
                href={user.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                View Resume
              </a>
            )}
          </div>
        </div>
        <div className="user-posts-section">
          <h3> {user.username} </h3>
          <div className="user-posts">
            {post.map((posts) => (
              <PostCard key={posts._id} post={posts} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
