import React from "react";
import "./Login.css";
import Logo from "../../assets/logo.jpg";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="login-container">
      <div className="headings">
        <h2>Share, Learn, and Experience Interviews with NextStep</h2>
        <p>
          Connect with Peers, Share your experience, and improve your content
          with AI
        </p>
      </div>
      <div className="outside-card">
        <div className="inside-card">
          <img src={Logo} alt="" />
          <p>Share, Learn, and Grow Together</p>
          <button className="login-btn">
            <FcGoogle />
            Continue With Google
          </button>
          <p className="terms">
            By continuing, you agree to our <span>Terms of service </span> and
            <span> Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
