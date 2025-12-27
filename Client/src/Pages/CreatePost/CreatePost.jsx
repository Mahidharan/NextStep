import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { FaPaperPlane } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../API/axios";
import { useAuth } from "../../Context/AuthContext";

function CreatePost() {
  const navigate = useNavigate();

  const change = (page) => {
    if (!page) return;

    navigate(page);
  };

  const [postData, setPostData] = useState({
    company: "",
    experience: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("User Not found");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", user._id);
      formData.append("company", postData.company);
      formData.append("experience", postData.experience);
      if (image) {
        formData.append("postImage", image);
      }

      const res = await api.post("/api/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post created successfully");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="create-header">
          <div className="author">
            <img src={user?.avatar?.url || Avatar} alt="user" />
            <div>
              <p className="author-name">{user?.name || "User"}</p>
              <span>@{user?.username}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="field">
            <label>Company</label>
            <input
              name="company"
              type="text"
              placeholder="Eg: Google, Amazon, Zoho"
              value={postData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label>Experience</label>
            <textarea
              name="experience"
              placeholder="Describe your interview process, questions, difficulty, tips..."
              value={postData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="media-row">
            <label htmlFor="file-upload" className="upload-label">
              <FaUpload /> Add image (optional)
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          <div className="actions">
            <button
              type="button"
              className="cancel"
              onClick={() => change("/")}
            >
              Cancel
            </button>
            <button type="submit" className="publish">
              <FaPaperPlane /> Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
