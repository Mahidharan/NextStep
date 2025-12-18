import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetails from "./Pages/PostDetails/PostDetails.jsx";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Chat from "./Pages/Chat/Chat";
import UserProfile from "./Pages/UserProfile/UserProfile";
import AuthSuccess from "./Pages/Auth/AuthSuccess.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/login" element={<Login />}></Route>

        {/* ProtectedRoutes */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoutes>
              <CreatePost />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoutes>
              <Chat />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
