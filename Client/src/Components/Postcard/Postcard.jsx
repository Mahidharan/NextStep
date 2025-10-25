import React from "react";
import "./PostCard.css";
import { FaRegComment } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdOutlineReadMore } from "react-icons/md";

function PostCard({ post }) {
  const navigate = useNavigate();

  const changePage = (page) => {
    if (!page) return;

    navigate(page);
  };

  return (
    <div className="post-card">
      <div className="userinfo">
        <img src={post.userAvatar} alt="elango avatar" />
        <div className="uname-company">
          <h3>{post.username}</h3>
          <p> {post.company} </p>
        </div>
      </div>
      <div className="post-img">
        <img src={post.postImage} alt="" />
      </div>
      <div className="experience">
        <p>
          {" "}
          {post.experience.length > 100
            ? post.experience.slice(0, 100) + "..."
            : post.experience}
        </p>
      </div>
      <div className="btn">
        <div className="comment">
          <FaRegComment />
          {post.comments.length}
        </div>
        <div className="read-more">
          <button onClick={() => changePage(`/post/${post.id}`)}>
            <MdOutlineReadMore className="icon" />
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
