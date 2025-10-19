import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetails from "./Pages/PostDetails/Postdetails";
import Profile from "./Pages/Profile/profile";
import Login from "./Pages/Login/Login";

function App() {
  const posts = [
    {
      id: 1,
      username: "Elango",
      company: "Payota",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: [
        {
          username: "Steve Roger",
          text: "Great",
        },
        { username: "Bruce", text: "Insightfull" },
      ],
    },
    {
      id: 2,
      username: "Nithi",
      company: "VijayFancy",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: [
        {
          username: "Steve Roger",
          text: "Great",
        },
        {
          username: "Bruce",
          text: "Nice one",
        },
      ],
    },
    {
      id: 3,
      username: "Jarvis",
      company: "Stark Industries",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: [
        {
          username: "Steve Roger",
          text: "Great",
        },
        { username: "Bruce", text: "Great Experience" },
      ],
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/post/:id" element={<PostDetails posts={posts} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
