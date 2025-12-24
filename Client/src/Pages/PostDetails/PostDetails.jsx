import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./PostDetails.css";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader";
import Footer from "../../Components/Footer/Footer.jsx";
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
        text: newComment,
      });

      setComments(res.data.data.comments);
      setNewComment("");
      console.log("Logged-in user:", user);
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
    <>
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
            <h3>💬 Comments ({comments.length})</h3>

            {comments.length === 0 ? (
              <p className="no-comments">Be the first one to comment ✨</p>
            ) : (
              <div className="comment-list">
                {comments.map((comment, index) => (
                  <div className="comment-card" key={index}>
                    <div className="comment-avatar">
                      {comment.avatar ? (
                        <img src={comment.avatar} alt={comment.username} />
                      ) : (
                        <span>{comment.username.charAt(0).toUpperCase()}</span>
                      )}
                    </div>

                    <div className="comment-content">
                      <span className="comment-username">
                        {comment.username}
                      </span>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="add-comment">
              <input
                type="text"
                value={newComment}
                placeholder="Write your thoughts..."
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <button onClick={handleAddComment}>Post</button>
            </div>
          </div>

          <Link to="/" className="back-button">
            ⬅ Back
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetails;
