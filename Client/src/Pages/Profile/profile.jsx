import React, { useState } from "react";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { FaUpload } from "react-icons/fa";

function Profile({ currentUser }) {
  const [userData, setUserData] = useState({
    fullname: currentUser?.fullname || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || "",
    linkedIn: currentUser?.linkedIn || "",
    resume: null,
  });

  const [editCard, setEditCard] = useState({
    profile: false,
    documents: false,
    links: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setUserData({ ...userData, resume: files[0] });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const handleEdit = (card) => {
    setEditCard({ ...editCard, [card]: true });
  };

  const saveEdit = (card) => {
    console.log("Saved user details:", userData);
    setEditCard({ ...editCard, [card]: false });
    alert(`${card} saved successfully!`);
  };

  return (
    <>
      <Navbar />
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <img src={Avatar} alt="Profile" className="profile-avatar" />
          <h3 className="profile-name">{userData.username || "Username"}</h3>
          <p className="profile-email">{userData.email || "Email"}</p>
          <button className="sidebar-btn">Edit Profile</button>
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
                placeholder="Full Name"
                disabled={!editCard.profile}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={!editCard.profile}
              />

              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                disabled={!editCard.profile}
              />

              <label>Bio</label>
              <input
                type="text"
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Short Bio"
                disabled={!editCard.profile}
              />
            </div>

            {!editCard.profile ? (
              <button
                className="edit-btn"
                onClick={() => handleEdit("profile")}
              >
                Edit
              </button>
            ) : (
              <button className="save-btn" onClick={() => saveEdit("profile")}>
                Save
              </button>
            )}
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
                disabled={!editCard.documents}
              />
              {userData.resume && (
                <p className="resume-info">Selected: {userData.resume.name}</p>
              )}
            </div>

            {!editCard.documents ? (
              <button
                className="edit-btn"
                onClick={() => handleEdit("documents")}
              >
                Edit
              </button>
            ) : (
              <button
                className="save-btn"
                onClick={() => saveEdit("documents")}
              >
                Save
              </button>
            )}
          </div>

          {/* Links Card */}
          <div className="profile-card">
            <h3>Links</h3>
            <div className="card-body">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedIn"
                placeholder="Enter LinkedIn URL"
                value={userData.linkedIn}
                disabled={!editCard.links}
                onChange={handleChange}
              />
            </div>

            {!editCard.links ? (
              <button className="edit-btn" onClick={() => handleEdit("links")}>
                Edit
              </button>
            ) : (
              <button className="save-btn" onClick={() => saveEdit("links")}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
