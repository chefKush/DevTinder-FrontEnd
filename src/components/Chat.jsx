import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  useEffect(() => {
    findUserById();
  }, []);

  const findUserById = async () => {
    console.log("===========");
    const res = await axios.get(BASE_URL + `/user/${targetUserId}`, {
      withCredentials: true,
    });
    setTargetUser(res.data.data);
  };
  console.log(targetUser);
  const { firstName, lastName, profilePicture } = targetUser || {};

  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("receiveMessage", ({ firstName, userId, text }) => {
      const isCurrentUser = userId === user?._id;
      setMessages((messages) => [
        ...messages,
        {
          id: Date.now(),
          sender: isCurrentUser ? "user" : "other",
          text,
          firstName,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
    // setMessages([...messages, { id: Date.now(), sender: "user", text: input }]);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto h-[80vh] bg-base-100 rounded-xl shadow-xl overflow-hidden border border-base-300">
      {/* Header */}
      <div className="p-4 bg-primary text-primary-content flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring ring-offset-2 ring-offset-primary ring-primary-content">
            <img src={profilePicture} alt="profile" />
          </div>
        </div>
        <h2 className="font-semibold text-lg">
          {firstName} {lastName}
        </h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${
              msg.sender === "user" ? "chat-end" : "chat-start"
            }`}
          >
            {/* Avatar */}
            <div className="chat-image avatar">
              <div className="w-8 h-8 rounded-full">
                <img
                  src={
                    msg.sender === "user" ? user.profilePicture : profilePicture
                  }
                  alt="avatar"
                />
              </div>
            </div>

            {/* Bubble */}
            <div
              className={`chat-bubble whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-primary text-primary-content"
                  : "bg-neutral text-neutral-content"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 bg-base-100 border-t border-base-300 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className={`btn ${
            newMessage.trim() ? "btn-primary" : "btn-disabled"
          }`}
          onClick={sendMessage}
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
