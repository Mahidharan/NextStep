import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Postdetails.css";

function Postdetails({ posts }) {
  const { id } = useParams();
  const post = posts?.find((p) => p.id === parseInt(id));

  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    setComments([...comments, newComment]);
    setNewComment("");
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") handleAddComment();
  };

  if (!post) {
    return (
      <div>
        <Navbar />
        <h3>Post Not Found</h3>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <Navbar />

      <div className="post-detail-card">
        <div className="post-header">
          <h2>{post.username}</h2>
          <p>{post.company}</p>
        </div>
        <div className="post-body">
          <p>{post.experience}</p>
        </div>

        <div className="post-comments">
          <h3>Comments ({comments.length}) </h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}> {comment} </li>
            ))}
          </ul>
          <div className="add-comment">
            <input
              type="text"
              value={newComment}
              placeholder="Write a comment"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <button onClick={handleAddComment}>Add</button>
          </div>
        </div>
        <Link to="/" className="back-button">
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}

export default Postdetails;
