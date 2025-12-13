import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Avatar from "../../assets/defaultavatar.png";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { api } from "../../API/axios.js";

function Profile() {
  const [userData, setUserData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    linkedIn: "",
    resume: null,
    resumeUrl: "",
    resumeName: "",
    profileImg: Avatar,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      if (!isEditing) return;
      const file = files[0];
      setUserData((prev) => ({
        ...prev,
        resume: file,
      }));
      uploadResume(file);
    } else if (name === "profileImg") {
      if (!isEditing) return;
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setUserData({ ...userData, profileImg: imageUrl });
        uploadAvatar(file);
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };
  const { user, updateUser } = useAuth();

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
          resumeUrl: fetchedUser.resumeUrl || "",
          profileImg: fetchedUser?.avatar?.url || Avatar,
          resumeName: fetchedUser.resumeName || "",
        });
      })
      .catch((err) => console.log(err));
  }, [user]);

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.put(`/user/avatar/${user._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = {
        ...res.data.data,
        avatar: {
          ...res.data.data.avatar,
          url: `${res.data.data.avatar.url}?t=${Date.now()}`,
        },
      };

      updateUser(updatedUser);

      setUserData((prev) => ({
        ...prev,
        profileImg: updatedUser.avatar.url,
      }));
    } catch (error) {
      toast.error("Failed To upload Avatar");
    }
  };

  const uploadResume = async (file) => {
    const formData = new FormData();

    formData.append("resume", file);

    try {
      const res = await api.put(
        `/user/profile/${user._id}/upload-resume`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUserData((prev) => ({
        ...prev,
        resumeUrl: res.data.data.resumeUrl,
        resumeName: res.data.data.resumeName,
        resume: null,
      }));
    } catch (error) {
      toast.error("Resume Upload failed");
    }
  };
  const handleSaveProfile = async () => {
    try {
      const payload = {
        name: userData.fullname,
        email: userData.email,
        bio: userData.bio,
        linkedIn: userData.linkedIn,
      };

      await api.put(`/user/profile/update/${user._id}`, payload);
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={userData.profileImg || user?.avatar?.url}
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
                toast("Profile Saved Successfully");
                handleSaveProfile();
              }
              setIsEditing(true);
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
              {userData.resumeName && (
                <p className="resume-info">Selected: {userData.resumeName}</p>
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
