import React, { useEffect, useState } from "react";
import Message from "./Message";
import apiRequest from "../../services/api";
const ChatWindow = ({
  currentContact,
  setCurrentContact,
  messages,
  setMessages,
  user,
  setError,
}) => {
  const [input, setInput] = useState("");
  const [inProgress, setInProgress] = useState(false);

  async function startConversation() {
    try {
      setInProgress(true);
      const conversation = await apiRequest(
        "POST",
        { text: input, receiverId: currentContact._id },
        "/api/message"
      );
      if (!conversation.data.success) {
        setError(conversation.data.messagae);
        setInProgress(false);

        return;
      }
      setInput("");
    } catch (err) {
      console.log(err.message);
      setError("something went wrong");
    } finally {
      setInProgress(false);
    }
  }

  if (!currentContact) {
    return <div>Select a contact to start the chat</div>;
  }
  return (
    <div className="h-full w-full rounded-xl bg-background text-white overflow-hidden border border-border shadow-lg">
      <div className="flex items-center gap-3 w-full bg-panel h-1/9 p-4 border-b border-border">
        <button
          onClick={() => setCurrentContact(null)}
          aria-label="Back to contacts"
          className="md:hidden group shrink-0 h-10 w-10 flex items-center justify-center rounded-xl border border-border bg-white/5 text-slate-300 transition-all duration-200 hover:bg-blue-500 hover:border-blue-400 hover:text-white active:scale-90 active:bg-blue-600"
        >
          <span className="text-xl transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
        </button>

        {currentContact.username}
      </div>

      <div className="bg-background h-7/9 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0
          ? "No messages yet"
          : messages.map((msg) => {
              return (
                <div key={msg._id}>
                  <Message key={msg._id} message={msg} user={user} />
                </div>
              );
            })}
      </div>

      <div className="top-full w-full h-1/9 shrink-0 bg-panel p-4 border-t border-border">
        <div className="flex items-center gap-3 w-full h-full px-4">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                return;
              }
              if (input.trim() === "") return;
              if (inProgress) return;
              startConversation();
            }}
            placeholder="Type a message..."
            className="flex-1 min-w-0 bg-surface text-text placeholder-muted border border-border rounded-xl px-4 py-3 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              if (input.trim() === "") return;
              if (inProgress) return;
              startConversation();
            }}
            disabled={inProgress}
            className="bg-primary text-white px-5 py-3 bg-accent rounded-xl font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
