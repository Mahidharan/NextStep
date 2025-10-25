import React, { useState } from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData, image);
  };

  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="header">
          <div className="image">
            <img src={Avatar} alt="" />
            <p>FRIDAY</p>
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
            />
            <label>Experience</label>
            <textarea
              name="experience"
              value={postData.experience}
              onChange={handleChange}
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
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
