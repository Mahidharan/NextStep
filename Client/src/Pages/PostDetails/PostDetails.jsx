import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./PostDetails.css";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader";
import { api } from "../../API/axios.js";

function PostDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`post/${id}`);
        setPost(res.data.data);
        setComments(res.data.data.comments || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const res = await api.post(`post/comment/${id}`, {
        userId: user._id,
        username: user.username,
        text: newComment,
      });

      setComments(res.data.data.comments);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loader />;

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
        <div className="img-container">
          <img src={post.image} alt="" />
        </div>
        <div className="post-body">
          <p>{post.experience}</p>
        </div>

        <div className="post-comments">
          <h3>Comments ({comments.length}) </h3>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.username}</strong>: {comment.text}
              </li>
            ))}
          </ul>
          <div className="add-comment">
            <input
              type="text"
              value={newComment}
              placeholder="Write a comment"
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
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

export default PostDetails;
