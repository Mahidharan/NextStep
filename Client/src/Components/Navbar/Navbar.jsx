import React from "react";
import Logo from "../../assets/logo.jpeg";
import UserIcon from "../../assets/usericon.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleMenuChange = (page) => {
    if (!page) return;

    navigate(page);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="NextStep Logo" className="logo" />
        <h1 className="title">NextStep</h1>
      </div>
      <ul className="nav-links">
        <li onClick={() => handleMenuChange("/")}>Home</li>
        <li onClick={() => handleMenuChange("profile")}>My Profile</li>
        <li>Chat</li>
        <li>LogOut</li>
      </ul>

      <div className="nav-right">
        <button className="create-post-btn">Create Post</button>

        <img src={UserIcon} alt="User" className="profile-img" />
      </div>
    </nav>
  );
}

export default Navbar;
