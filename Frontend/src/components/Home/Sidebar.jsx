import React from "react";
import AddForm from "./AddForm";
import apiRequest from "../../services/api";
import { useNavigate } from "react-router-dom";

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
  setUser,
}) => {
  const navigate = useNavigate();
  async function handleRemoveContact(contactId) {
    try {
      setError("");

      const response = await apiRequest(
        "DELETE",
        {},
        `/api/contact/${contactId}`
      );

      if (!response.ok) {
        return setError(response.data.message);
      }

      if (currentContact?.contactId === contactId) {
        setCurrentContact(null);
      }

      await getContacts();
    } catch (err) {
      console.log(err.message);
      setError("Could not remove contact");
    }
  }
  async function handleLogout() {
    try {
      setError("");
      const response = await apiRequest("POST", {}, "/api/auth/logout");
      console.log("Logout response:", response);
      if (!response.data.success) {
        return setError(response.data.message);
      }
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err.message);
      setError("something went wrong cannot logout");
    }
  }

  return (
    <div className="h-full w-full p-4 rounded-xl bg-[#111827] border border-[#263248] text-[#F1F5F9] flex flex-col">
      <div className="flex justify-around items-center mb-5">
        <h1 className="text-2xl font-bold text-accent">Talk</h1>
        <button
          className="bg-accent px-3 py-1.5 rounded-md "
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
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
                navigate("/");
              }}
              className="p-3 rounded-lg bg-[#1E293B] hover:bg-[#263248] cursor-pointer transition"
            >
              <h3 className="font-medium text-sm">{contact.username}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveContact(contact.contactId);
                }}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
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
