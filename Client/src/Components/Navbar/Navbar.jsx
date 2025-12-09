import React, { useState } from "react";
import Logo from "../../assets/logo.jpeg";
import UserIcon from "../../assets/usericon.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaHome, FaUser, FaTimes } from "react-icons/fa";
import { BsFillChatLeftFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { useAuth } from "../../Context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuChange = (page) => {
    if (!page) return;
    navigate(page);
    setMenuOpen(false);
  };

  const { user, logout, loading } = useAuth();
  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="NextStep Logo" className="logo" />
        <h1 className="title">NextStep</h1>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => handleMenuChange("/")}>
          <FaHome className="icon" />
          <span>Home</span>
        </li>
        <li onClick={() => handleMenuChange("/my-profile")}>
          <FaUser className="icon" />
          <span>My Profile</span>
        </li>
        <li onClick={() => handleMenuChange("/chat")}>
          <BsFillChatLeftFill className="icon" />
          <span>Chat</span>
        </li>
        <li onClick={() => handleMenuChange("/create-post")}>
          <IoIosCreate className="icon" />
          <span>Create Post</span>
        </li>
        <li className="logout" onClick={logout}>
          <FiLogOut className="icon" />
          <span>Log Out</span>
        </li>
      </ul>

      <div className="nav-right">
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <RiMenu3Fill />}
        </div>
        <img
          src={user?.avatar?.url}
          onError={(e) => (e.target.src = UserIcon)}
          alt="User"
          className="profile-img"
        />
      </div>
    </nav>
  );
}

export default Navbar;
