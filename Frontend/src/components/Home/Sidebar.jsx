import React from "react";
import AddForm from "./AddForm";

const Sidebar = ({
  email,
  currentContact,
  setCurrentContact,
  setEmail,
  setError,
  error,
  contacts,
  getContacts,
  user,
}) => {
  return (
    <div className="h-full w-full p-4 rounded-xl bg-[#111827] border border-[#263248] text-[#F1F5F9] flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-accent">Talk</h1>
      </div>
      <div className="mb-6">
        <p className="text-sm text-[#94A3B8]">Welcome back,</p>
        <h2 className="text-xl font-semibold text-[#F1F5F9] truncate">
          {user.username}
        </h2>
      </div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-3">
        Chats
      </h2>

      <div className="flex flex-col gap-2 overflow-y-auto flex-1">
        {contacts.map((contact) => {
          return (
            <div
              key={contact._id}
              onClick={() => {
                setCurrentContact(contact);
              }}
              className="p-3 rounded-lg bg-[#1E293B] hover:bg-[#263248] cursor-pointer transition"
            >
              <h3 className="font-medium text-sm">{contact.username}</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-[#94A3B8] truncate">Last message</p>
                <p className="text-xs text-[#64748B]">10:30</p>
              </div>
            </div>
          );
        })}
      </div>

      <AddForm
        email={email}
        error={error}
        setError={setError}
        setEmail={setEmail}
        getContacts={getContacts}
      />
    </div>
  );
};

export default Sidebar;
