import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { api } from "../../API/axios.js";

function Profile({ currentUser }) {
  const [userData, setUserData] = useState({
    fullname: currentUser?.fullname || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    linkedIn: currentUser?.linkedIn || "",
    resume: null,
    profileImg: currentUser?.profileImg || Avatar,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setUserData({ ...userData, resume: files[0] });
    } else if (name === "profileImg") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUserData({ ...userData, profileImg: imageUrl });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) return;
    api
      .get(`/user/profile/${user._id}`)
      .then((res) => {
        const fetchedUser = res.data.data;
        setUserData({
          fullname: fetchedUser.name || "",
          username: fetchedUser.name || "",
          email: fetchedUser.email || "",
          bio: fetchedUser.bio || "",
          linkedIn: fetchedUser.linkedIn || "",
          resume: null,
          profileImg: fetchedUser.avatar?.url || Avatar,
        });
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={user?.avatar?.url || userData.profileImg}
              alt="Profile"
              className="profile-avatar"
            />
            {isEditing && (
              <label htmlFor="profile-upload" className="change-photo-label">
                Change Photo
              </label>
            )}
            <input
              id="profile-upload"
              name="profileImg"
              type="file"
              onChange={handleChange}
              style={{ display: "none" }}
              disabled={!isEditing}
            />
          </div>

          <h3 className="profile-name">{userData.username || "Username"}</h3>
          <p className="profile-email">{userData.email || "Email"}</p>

          <button
            className={isEditing ? "save-btn" : "edit-btn"}
            onClick={() => {
              if (isEditing) {
                toast("Saved Successfully");
              }
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark"
            toastStyle={{
              backgroundColor: "#151823",
              color: "#e5e5e5",
              border: "1px solid #6c63ff",
              borderRadius: "10px",
              fontFamily: "Poppins",
            }}
          />
        </aside>

        <div className="profile-main">
          <div className="profile-card">
            <h3>Personal Information</h3>
            <div className="card-body">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={userData.fullname}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />

              <label>Bio</label>
              <input
                type="text"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="document-card">
            <h3>Documents</h3>
            <div className="card-body">
              <label htmlFor="file-upload" className="upload-label">
                <span className="upload-icon">
                  <FaUpload />
                </span>
                Upload Resume
              </label>
              <input
                id="file-upload"
                name="resume"
                type="file"
                onChange={handleChange}
                disabled={!isEditing}
              />
              {userData.resume && (
                <p className="resume-info">Selected: {userData.resume.name}</p>
              )}
            </div>
          </div>

          <div className="profile-card">
            <h3>Links</h3>
            <div className="card-body">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedIn"
                placeholder="Enter LinkedIn URL"
                value={userData.linkedIn}
                disabled={!isEditing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
