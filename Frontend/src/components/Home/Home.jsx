import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import fetchData from "../../services/api";
import apiRequest from "../../services/api";
import socket from "../../services/socket";

const Home = ({ user, setUser }) => {
  // State
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  // Functions
  async function fetchMessages() {
    try {
      setMessages([]);
      setConversationId(null);

      const response = await fetchData(
        "GET",
        null,
        `/api/message?receiverId=${currentContact._id}`
      );

      if (!response.data.success) {
        console.log("this one ran");
        return;
      }

      setConversationId(response.data.conversationId);
      return setMessages(response.data.data);
    } catch (err) {
      console.log(err);
      return setError("something went wrong");
    }
  }

  async function getContacts() {
    setError("");
    setMessages([]);

    try {
      const result = await apiRequest("GET", {}, "/api/contact");

      if (!result.ok) {
        return setError(result.data.message);
      }

      setContacts(result.data.data);
      return;
    } catch (err) {
      console.log(err.message);
      setError("something went wrong");
    }
  }

  // Effects
  useEffect(() => {
    function handleNewMsg(msg) {
      setMessages((prev) => [...prev, msg]);
    }

    socket.on("new-message", handleNewMsg);

    return () => {
      socket.off("new-message", handleNewMsg);
    };
  }, []);

  useEffect(() => {
    if (!conversationId) return;

    console.log(conversationId);

    socket.emit("join-conversation", conversationId);

    return () => {
      socket.emit("leave-conversation", conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    function handleConnect() {
      console.log("SOCKET CONNECTED:", socket.id);
    }

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect_error", (err) => {
      console.log("SOCKET ERROR:", err.message);
    });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    if (!currentContact) return;
    fetchMessages();
  }, [currentContact]);

  // UI
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-white md:gap-4 md:p-4">
      {/* Sidebar */}
      <div
        className={`${
          currentContact ? "hidden" : "flex"
        } w-full md:flex md:w-1/4 md:min-w-[280px] md:max-w-[360px]`}
      >
        <Sidebar
          email={email}
          setEmail={setEmail}
          setError={setError}
          error={error}
          contacts={contacts}
          getContacts={getContacts}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
          user={user}
          setUser={setUser}
        />
      </div>

      {/* Chat Window */}
      <div
        className={`${
          currentContact ? "flex" : "hidden"
        } w-full min-w-0 md:flex md:flex-1`}
      >
        <ChatWindow
          user={user}
          setError={setError}
          setMessages={setMessages}
          messages={messages}
          currentContact={currentContact}
          setCurrentContact={setCurrentContact}
        />
      </div>
    </div>
  );
};

export default Home;
