import React from "react";
import "./Login.css";
import Logo from "../../assets/logo.jpg";

function Login() {
  return (
    <div className="login-container">
      <div className="headings"></div>
      <div className="outside-card">
        <div className="inside-card">
          <img src={Logo} alt="" />
          <p>Share, Learn, and Grow Together</p>
          <button className="login-btn"> Continue With Google</button>
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
