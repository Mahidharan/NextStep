import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import PostCard from "../../Components/Postcard/PostCard";
import Loader from "../../Components/Loader/Loader";
import Footer from "../../Components/Footer/Footer.jsx";
import { api } from "../../API/axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/api/post/all");
        setPosts(res.data.data);

        const elapsed = Date.now();
        const delay = Math.max(5000 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="home">
        <Navbar />
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
