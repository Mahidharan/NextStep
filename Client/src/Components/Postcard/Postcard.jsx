import React from "react";
import "./Postcard.css";
import { MdVolumeUp } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

function Postcard({ post }) {
  return (
    <div className="post-card">
      <h3 className="username"> {post.username}</h3>
      <p className="company"> {post.company} </p>
      <p className="experience">
        {" "}
        {post.experience.length > 100
          ? post.experience.slice(0, 100) + "...."
          : post.experience}{" "}
      </p>
      <div className="card-actions">
        <button className="read-aloud">
          <MdVolumeUp size={18} style={{ marginRight: "6px" }} />
          Read Aloud
        </button>
        <button className="read-more">
          <FiBookOpen size={18} style={{ marginRight: "6px" }} />
          Read More
        </button>
      </div>
    </div>
  );
}

export default Postcard;
