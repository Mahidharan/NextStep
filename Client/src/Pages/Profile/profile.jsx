import React from "react";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";

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
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Profile data", userData);
    alert("profile saved Successfully");
  };

  const handleEdit = (card) => {
    setEditCard({ ...editCard, [card]: true });
  };

  const saveEdit = (card) => {
    console.log("saved user details", userData);

    setEditCard({ ...editCard, [card]: false });
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        <h3>Profile Info</h3>
        <div className="profile-content">
          Full Name :
          <input
            type="text"
            name="fullname"
            value={userData.fullname}
            placeholder="Full Name"
            onChange={handleChange}
            disabled={!editCard.profile}
          />
          Email :
          <input
            type="email"
            name="email"
            required={true}
            value={userData.email}
            placeholder="Email"
            onChange={handleChange}
            disabled={!editCard.profile}
          />
          UserName :
          <input
            type="text"
            name="username"
            value={userData.username}
            placeholder="UserName"
            onChange={handleChange}
            disabled={!editCard.profile}
          />
          Bio :
          <input
            type="text"
            name="bio"
            value={userData.bio}
            placeholder="Bio"
            onChange={handleChange}
            disabled={!editCard.profile}
          />
          {!editCard.profile ? (
            <button className="edit-btn" onClick={() => handleEdit("profile")}>
              Edit
            </button>
          ) : (
            <button className="save-btn" onClick={() => saveEdit("profile")}>
              {" "}
              Save{" "}
            </button>
          )}
        </div>
        <div className="profile-container">
          Documents
          <div className="profile-content">
            <input
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              disabled={!editCard.documents}
            />
            {userData.resume && (
              <p className="resume-overview">
                Selected Resume : {userData.resume.name}{" "}
              </p>
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
            <button className="save-btn" onClick={() => saveEdit("documents")}>
              Save
            </button>
          )}
        </div>
      </div>
      <div className="profile-container">
        Links
        <div className="profile-content">
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
  );
}

export default Profile;
