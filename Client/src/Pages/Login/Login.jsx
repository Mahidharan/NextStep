import React, { useEffect } from "react";
import "./Login.css";
import Logo from "../../assets/nextsteplogo.png";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const changePage = (page) => {
    if (!page) return;

    navigate(page);
  };

  return (
    <div className="login-container">
      <div className="inside-card">
        <img src={Logo} alt="" />
        <p>Share, Learn, and Grow Together</p>
        <button
          className="login-btn"
          onClick={() => {
            window.location.href = `${
              import.meta.env.VITE_BACKEND_URL
            }/api/user/google`;
          }}
        >
          <FcGoogle />
          Continue With Google
        </button>
        <p className="terms">
          By continuing, you agree to our{" "}
          <span onClick={() => changePage("/terms")}>Terms of service </span>{" "}
          and
          <span onClick={() => changePage("/privacy-policy")}>
            {" "}
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
