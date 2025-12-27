import React from "react";
import "./PostCard.css";
import { FaRegComment, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/usericon.jpg";

function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <img
            src={post?.userAvatar || UserIcon}
            alt="user"
            onClick={() => navigate(`/profile/${post.userId}`)}
          />

          <div>
            <p className="username">{post.username}</p>
          </div>
        </div>

        <span className="company-badge">{post.company}</span>
      </div>

      <h4 className="post-title">{post.title || "Interview Experience"}</h4>

      <p className="post-preview">
        {post.experience.length > 160
          ? post.experience.slice(0, 250) + "..."
          : post.experience}
      </p>

      <div className="post-footer">
        <div className="actions">
          <span>
            <FaThumbsUp /> {post.likes || 0}
          </span>
          <span>
            <FaRegComment /> {post.comments.length}
          </span>
        </div>

        <button
          className="read-more"
          onClick={() => navigate(`/post/${post._id}`)}
        >
          Read more →
        </button>
      </div>
    </div>
  );
}

export default PostCard;
