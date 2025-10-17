import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import PostCard from "../../Components/Postcard/Postcard";

function Home({posts}) {
  
  return (
    <div className="home">
      <Navbar />
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
