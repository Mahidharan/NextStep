import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.jsx";
import "./AuthSuccess.css";

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userString = params.get("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);

        login(user);

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error("Error parsing user", err);
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="auth-loader">
      <div className="loader-circle"></div>
      <p>Loading...</p>
    </div>
  );
}

export default AuthSuccess;
