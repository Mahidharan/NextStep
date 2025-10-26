import React from "react";
import Logo from "../../assets/logo.jpeg";
import UserIcon from "../../assets/usericon.jpg";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BsFillChatLeftFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

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
        <li onClick={() => handleMenuChange("/")}>
          <FaHome className="icon" />
          <span>Home</span>
        </li>
        <li onClick={() => handleMenuChange("/profile")}>
          <FaUser className="icon" />
          <span>My Profile</span>
        </li>
        <li onClick={() => handleMenuChange("/chat")}>
          <BsFillChatLeftFill className="icon" />
          <span>Chat</span>
        </li>
        <li className="logout">
          <FiLogOut className="icon" />
          <span>Log Out</span>
        </li>
      </ul>

      <div className="nav-right">
        <button
          className="create-post-btn"
          onClick={() => handleMenuChange("/create-post")}
        >
          <IoIosCreate className="icon" />
          <span>Create Post</span>
        </button>

        <img src={UserIcon} alt="User" className="profile-img" />
      </div>
    </nav>
  );
}

export default Navbar;
