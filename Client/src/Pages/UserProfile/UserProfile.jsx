import React, { useState } from "react";
import "./UserProfile.css";
import Avatar from "../../assets/defaultavatar.png";
import Navbar from "../../Components/Navbar/Navbar";
import PostCard from "../../Components/Postcard/PostCard";

function UserProfile() {
  const [user, setUser] = useState({
    username: "Elango",
    fullname: "Elangovan",
    email: "elango@example.com",
    bio: "Frontend Developer | Tech Enthusiast",
    linkedIn: "https://linkedin.com/in/elango",
    resume: "https://exampleresume.com",
    profileImg: Avatar,
  });

  const [post, setPost] = useState([
    {
      id: 1,
      company: "Google",
      experience:
        "Interview was challenging but great learning! Focused on DSA and problem-solving.",
      username: "Elango",
      userAvatar: Avatar,
      comments: 5,
    },
    {
      id: 2,
      company: "Amazon",
      experience:
        "They emphasized system design and leadership principles. Great experience overall!",
      username: "Elango",
      userAvatar: Avatar,
      comments: 2,
    },
  ]);

  return (
    <>
      <Navbar />
      <div className="user-profile-container">
        <div className="user-header">
          <img src={user.profileImg} alt="" className="user-avatar" />
          <div className="user-info">
            <h2>{user.fullname}</h2>
            <p className="username">@{user.username}</p>
            <p className="bio"> {user.bio} </p>
            <a href={user.linkedIn} className="linkedin-link">
              View LinkedIn
            </a>
            {user.resume && (
              <a href={user.resume} className="resume-link">
                View Resume
              </a>
            )}
          </div>
        </div>
        <div className="user-posts-section">
          <h3> {user.username} </h3>
          <div className="user-posts">
            {post.map((posts) => (
              <PostCard key={posts.id} post={posts} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
