import React from "react";
import "./Login.css";
import Logo from "../../assets/logo.jpg";

function Login() {
  return (
    <div className="login-container">
      <div className="headings">
        <h2>Share, Learn, and Experience Interviwes with NextStep</h2>
        <p>
          connect with peers, share your experiences, and improve your content
          with AI
        </p>
      </div>
      <div className="login-card">
        <div className="login-left">
          <h2>Log In</h2>
          <input type="email" placeholder="Enter your Email" />
          <input type="password" placeholder="Enter Your Password" />
          <button className="login-btn">Log In</button>
          <div className="switch">
            <p>
              New to NextStep <span>Sign Up</span>
            </p>
          </div>
        </div>
        <div className="right-img">
          <img src={Logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;
