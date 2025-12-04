import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userString = params.get("user");

    if (userString) {
      try {
        const user = JSON.parse(userString);

        localStorage.setItem("nextstep-user", JSON.stringify(user));

        navigate("/");
      } catch (error) {
        console.error("Error parsing user", err);
      }
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Logging You In</h2>
    </div>
  );
}
export default AuthSuccess;
