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
  // Navigation
  const navigate = useNavigate();

  // Handlers
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

  // UI
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-none border-0 bg-panel p-4 text-white sm:rounded-xl sm:border sm:border-border sm:p-5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Talk
        </h1>

        <button
          onClick={() => {
            handleLogout();
          }}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition-all duration-200 hover:border-danger/50 hover:bg-danger/10 hover:text-danger active:scale-95"
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="mb-7 min-w-0">
        <p className="mb-1 text-sm text-muted">Welcome back,</p>

        <h2 className="truncate text-xl font-semibold">{user.username}</h2>
      </div>

      {/* Contacts Heading */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          Chats
        </h2>

        <span className="text-xs text-muted">{contacts.length}</span>
      </div>

      {/* Contact List */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain pr-1">
        {contacts.map((contact) => {
          return (
            <div
              key={contact._id}
              onClick={() => {
                setCurrentContact(contact);
                navigate("/");
              }}
              className={`group min-w-0 cursor-pointer rounded-xl border p-3 transition-all duration-200 active:scale-[0.99] ${
                currentContact?._id === contact._id
                  ? "border-foreground/50 bg-foreground/10"
                  : "border-transparent bg-surface hover:border-border hover:bg-[#222222]"
              }`}
            >
              <div className="flex min-w-0 items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold">
                  {contact.username}
                </h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveContact(contact.contactId);
                  }}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs text-danger transition-colors hover:bg-danger/10 active:scale-95"
                >
                  Remove
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted">Last message</p>

                <p className="shrink-0 text-xs text-muted/70">10:30</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Contact */}
      <div className="mt-4 shrink-0">
        <AddForm
          email={email}
          error={error}
          setError={setError}
          setEmail={setEmail}
          getContacts={getContacts}
        />
      </div>
    </div>
  );
};

export default Sidebar;
