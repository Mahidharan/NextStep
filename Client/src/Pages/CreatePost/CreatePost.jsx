import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
      formData.append("postImage", image);

      const res = await api.post("api/post/create", formData, {
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
        <div className="header">
          <div className="image">
            <img src={user?.avatar?.url} alt="" />
            <p>{user?.username || user?.name || "User"}</p>
          </div>
          <h2>Create Post Share Experience</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Company Name</label>
            <input
              name="company"
              type="text"
              value={postData.company}
              onChange={handleChange}
              required={true}
            />
            <label>Experience</label>
            <textarea
              name="experience"
              value={postData.experience}
              onChange={handleChange}
              required={true}
            ></textarea>
          </div>
          <div className="upload-image">
            <label htmlFor="file-upload" className="upload-label">
              <span className="upload-icon">
                <FaUpload />
              </span>{" "}
              Upload Image
            </label>
            <input
              name="postImage"
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={true}
            />

            {preview && (
              <div>
                <img
                  src={preview}
                  alt=""
                  style={{ width: "200px", height: "auto", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
          <div className="btns">
            <button onClick={() => change("/")}>
              <BsArrowBarLeft />
              Cancel
            </button>
            <button type="submit" className="post-btn">
              <FaPaperPlane /> Post
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
