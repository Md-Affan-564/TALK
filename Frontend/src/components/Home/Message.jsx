import React from "react";

const Message = ({ message, user }) => {
  const isOwnMessage =
    String(message.sender?._id || message.sender) === String(user._id);

  return (
    <div
      className={`flex w-full ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex w-fit max-w-[85%] flex-col gap-1 rounded-2xl px-3 py-2 shadow-sm sm:max-w-[75%] ${
          isOwnMessage
            ? "rounded-br-sm bg-foreground text-white"
            : "rounded-bl-sm border border-border bg-surface text-slate-100"
        }`}
      >
        <p className="break-words whitespace-pre-wrap text-sm leading-relaxed">
          {message.text}
        </p>

        <p
          className={`text-right text-[10px] ${
            isOwnMessage ? "text-blue-100/80" : "text-muted"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default Message;
