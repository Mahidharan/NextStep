import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import Postcard from "../../Components/Postcard/Postcard";

function Home() {
  const posts = [
    {
      id: 1,
      username: "Elango",
      company: "Payota",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
    },
    {
      id: 2,
      username: "Nithi",
      company: "VijayFancy",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
    },
    {
      id: 3,
      username: "Jarvis",
      company: "Stark Industries",
      experience:
        "I went through multiple rounds of interviews and learned a lot about problem solving and system design...",
    },
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="post-grid">
        {posts.map((post) => (
          <Postcard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
