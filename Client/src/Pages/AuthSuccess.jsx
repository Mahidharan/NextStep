import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 

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

        navigate("/");
      } catch (err) {
        console.error("Error parsing user", err);
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate, login]);

  return (
    <div>
      <h2>Logging You In...</h2>
    </div>
  );
}

export default AuthSuccess;
