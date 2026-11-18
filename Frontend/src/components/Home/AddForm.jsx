import React, { useState } from "react";
import apiRequest from "../../services/api";

const AddForm = ({ email, setEmail, error, setError, getContacts }) => {
  async function submitHandler(e) {
    e.preventDefault();
    try {
      setError("");
      const result = await apiRequest("POST", { email: email }, "/api/contact");
      if (!result.ok) {
        return setError(result.data.message);
      }
      await getContacts();
      setEmail("");
    } catch (err) {
      console.log(err.message);
      setError("something went wrong");
    }
  }

  return (
    <>
      <form onSubmit={submitHandler} className="flex w-full gap-2">
        <input
          className="min-w-0 flex-1 rounded-xl border border-border bg-surface px-3 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-foreground focus:ring-2 focus:ring-foreground/20"
          type="email"
          placeholder="Enter email..."
          value={email}
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="shrink-0 cursor-pointer rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent active:scale-95"
          type="submit"
          value="Add"
        />
      </form>

      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </>
  );
};

export default AddForm;
