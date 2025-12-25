import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../../Components/Loader/Loader.jsx";

function AuthSuccess() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="auth-loader">
      <Loader />
    </div>
  );
}

export default AuthSuccess;
