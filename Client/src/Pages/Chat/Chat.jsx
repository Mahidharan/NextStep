import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Chat.css";
import Navbar from "../../Components/Navbar/Navbar";
import { FaPaperPlane } from "react-icons/fa";
import { api } from "../../API/axios.js";
import Loader from "../../Components/Loader/Loader.jsx";
import Avatar from "../../assets/defaultavatar.png";
import { useAuth } from "../../Context/AuthContext.jsx";

function Chat() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuth();

  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setUsers([]);
        return;
      }
      try {
        const res = await api.get(`/api/user/search?query=${search}`);
        setUsers(res.data.data);
      } catch (error) {
        console.error("User search error", error);
      }
    };
    fetchUsers();
  }, [search]);

  const socketRef = useRef(null);

  const selectedUserRef = useRef(null);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    socketRef.current = new WebSocket(import.meta.env.VITE_WS_URL);

    socketRef.current.onopen = () => {
      console.log("✅WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const msg = event.data.type ? event.data.data : JSON.parse(event.data);

      if (msg.type === "ONLINE_USERS") {
        setOnlineUsers(msg.users);
        return;
      }

      const currentChatUser = selectedUserRef.current;
      if (!currentChatUser) return;

      const senderId = msg.sender?._id || msg.sender;
      const receiverId = msg.receiver?._id || msg.receiver;

      const isCurrentChat =
        (senderId === currentChatUser._id && receiverId === user._id) ||
        (senderId === user._id && receiverId === currentChatUser._id);

      if (isCurrentChat) {
        setMessage((prev) => [...prev, msg]);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const openChat = async (user) => {
    setSelectedUser(user);
    setLoading(true);

    try {
      const res = await api.get(`/api/chat/${user._id}`);
      setMessage(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    const payload = {
      sender: user._id,
      receiver: selectedUser._id,
      text: newMessage,
      createdAt: new Date(),
    };

    setMessage((prev) => [...prev, payload]);

    socketRef.current.send(
      JSON.stringify({
        type: "MESSAGE",
        data: payload,
      })
    );

    await api.post("/api/chat/send", {
      receiverId: selectedUser._id,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const navigate = useNavigate();

  const changePage = (page) => {
    if (!page) return;

    navigate(page);
  };

  return (
    <>
      <Navbar />
      <div className="chat-page">
        <div className="right-sidebar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="user-list">
            {users.map((user) => (
              <div
                key={user._id}
                className={`user-item ${
                  selectedUser?._id === user._id ? "active" : ""
                }`}
                onClick={() => openChat(user)}
              >
                <img
                  src={user.avatar?.url}
                  alt={user.name}
                  onClick={() => changePage(`/profile/${user._id}`)}
                />
                <div>
                  <h4>{user.name}</h4>
                  {onlineUsers.includes(user._id) && (
                    <span className="online-dot"></span>
                  )}
                </div>
              </div>
            ))}
            {search && users.length === 0 && <p>No User found</p>}
          </div>
        </div>
        <div className="msg-container">
          {loading ? (
            <Loader />
          ) : !selectedUser ? (
            <div className="chat-body">
              <p>Search and Select a user to chat</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <img
                  src={selectedUser.avatar.url || Avatar}
                  alt={selectedUser.name}
                />
                <h3>{selectedUser.name}</h3>
              </div>
              <div className="chat-body">
                {message.map((msg, index) => (
                  <div
                    key={msg._id || `${msg.sender?._id}-${index}`}
                    className={`message ${
                      (msg.sender?._id || msg.sender) === user._id
                        ? "sent"
                        : "received"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={chatEndRef}></div>

                <div className="chat-input">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button onClick={sendMessage}>
                    <FaPaperPlane /> Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
