import React from "react";
import "./PostCard.css";
import { MdVolumeUp } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="comment-count">
        <FaRegComment size={18} />
        <span>{post.comments.length}</span>
      </div>

      <h3 className="username"> {post.username}</h3>
      <p className="company"> {post.company} </p>
      <p className="experience">
        {" "}
        {post.experience.length > 100
          ? post.experience.slice(0, 100) + "..."
          : post.experience}{" "}
      </p>

      <div className="card-actions">
        <button className="read-aloud">
          <MdVolumeUp size={18} style={{ marginRight: "6px" }} />
          Read Aloud
        </button>
        <Link to={`/post/${post.id}`}>
          <button className="read-more">
            <FiBookOpen size={18} style={{ marginRight: "6px" }} />
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
