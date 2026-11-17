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
      <form onSubmit={submitHandler} className="flex gap-2 w-full">
        <input
          className="flex-1 min-w-0 bg-[#1E293B] text-[#F1F5F9] placeholder-[#64748B] rounded-lg outline-none border border-[#334155] px-3 py-2 text-sm focus:border-[#38BDF8] transition"
          type="email"
          placeholder="Enter email..."
          value={email}
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          className="cursor-pointer rounded-lg bg-[#0284C7] hover:bg-[#0EA5E9] text-white font-medium px-4 py-2 text-sm transition"
          type="submit"
          value="Add"
        />
      </form>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </>
  );
};

export default AddForm;
