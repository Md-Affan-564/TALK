import React from "react";

const Message = ({ message, user }) => {
  const isOwnMessage =
    String(message.sender?._id || message.sender) === String(user._id);
  return (
    <div
      className={`w-full flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] w-fit flex flex-col gap-1 px-3 py-2 rounded-2xl shadow-sm ${
          isOwnMessage
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-slate-800 text-slate-100 rounded-bl-sm"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.text}
        </p>

        <p
          className={`text-[10px] text-right ${
            isOwnMessage ? "text-blue-200" : "text-slate-400"
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
