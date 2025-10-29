import React, { useState } from "react";
import "./Chat.css";
import Navbar from "../../Components/Navbar/Navbar";
import { FaPaperPlane } from "react-icons/fa";

function Chat() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jarvis",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi2haw1278i40sszGwCvy7LKP3j2KqLTnPJg&s",
      online: true,
    },
    {
      id: 2,
      name: "FRIDAY",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi2haw1278i40sszGwCvy7LKP3j2KqLTnPJg&s",
      online: false,
    },
    {
      id: 3,
      name: "EDITH",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi2haw1278i40sszGwCvy7LKP3j2KqLTnPJg&s",
      online: true,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const [message, setMessage] = useState([
    {
      sender: "me",
      text: "Hi!there",
    },

    {
      sender: "other",
      text: "hey!Whatsup",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    setMessage((prev) => [...prev, { sender: "me", text: newMessage }]);
    setNewMessage("");
  };

  // setTimeout(() => {
  //   setMessage((prev) => {
  //     [...prev, { sender: "other", text: "Got your Message" }];
  //   });
  // }, 8000);

  return (
    <>
      <Navbar />
      <div className="chat-page">
        <div className="right-sidebar">
          <div className="search-bar">
            <input type="text" placeholder="Search User" />
          </div>
          <div className="user-list">
            {users.map((user) => (
              <div
                key={user.id}
                className={`user-item ${
                  selectedUser.id === user.id ? "active" : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img src={user.avatar} alt={user.name} />
                <div>
                  <h4>{user.name}</h4>
                  {user.online && <span className="online-dot"></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="msg-container">
          <div className="chat-header">
            <img src={selectedUser.avatar} alt="" />
            <h3>{selectedUser.name}</h3>
          </div>
          <div className="chat-body">
            {message.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "me" ? "sent" : "received"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>
              <FaPaperPlane /> Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
