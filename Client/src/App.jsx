import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Postdetails from "./Pages/PostDetails/Postdetails";

function App() {
  const posts = [
    {
      id: 1,
      username: "Elango",
      company: "Payota",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: ["Great experience!", "Thanks for sharing!"],
    },
    {
      id: 2,
      username: "Nithi",
      company: "VijayFancy",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: ["Great experience!", "Thanks for sharing!"],
    },
    {
      id: 3,
      username: "Jarvis",
      company: "Stark Industries",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
      comments: ["Great experience!", "Thanks for sharing!"],
    },
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/post/:id" element={<Postdetails posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;
