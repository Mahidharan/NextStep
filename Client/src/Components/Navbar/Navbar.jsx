import React from "react";
import Logo from "../../assets/logo.jpg";
import UserIcon from "../../assets/usericon.jpg";
import "./Navbar.css"

function Navbar() {
  return (
     <nav className="navbar">
      <div className="nav-left">
        <img src={Logo} alt="NextStep Logo" className="logo" />
        <h1 className="title">NextStep</h1>
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>My Profile</li>
        <li>Chat</li>
        <li>LogOut</li>
      </ul>

      <div className="nav-right">
        <img src={UserIcon} alt="User" className="profile-img" />
      </div>
    </nav>
  );
};
 

export default Navbar;
