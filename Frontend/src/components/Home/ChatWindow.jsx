import React, { useState } from "react";
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
  // State
  const [input, setInput] = useState("");
  const [inProgress, setInProgress] = useState(false);

  // Handlers
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

  // UI
  if (!currentContact) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-border bg-background p-4 text-center text-muted">
        Select a contact to start the chat
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-none border-0 bg-background text-white shadow-lg sm:rounded-xl sm:border sm:border-border">
      {/* Chat Header */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-panel px-4 sm:px-5">
        <button
          onClick={() => setCurrentContact(null)}
          aria-label="Back to contacts"
          className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-white active:scale-90 md:hidden"
        >
          <span className="text-xl transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
        </button>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold sm:text-lg">
            {currentContact.username}
          </h2>
          <p className="text-xs text-muted">Conversation</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain bg-background p-3 sm:p-5">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-center text-sm text-muted">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => {
            return (
              <div key={msg._id}>
                <Message key={msg._id} message={msg} user={user} />
              </div>
            );
          })
        )}
      </div>

      {/* Message Input */}
      <div className="shrink-0 border-t border-border bg-panel p-3 sm:p-4">
        <div className="flex w-full items-center gap-2 sm:gap-3">
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
            className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-foreground/20"
          />

          <button
            type="button"
            onClick={() => {
              if (input.trim() === "") return;
              if (inProgress) return;
              startConversation();
            }}
            disabled={inProgress}
            className="shrink-0 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
