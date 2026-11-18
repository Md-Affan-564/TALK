import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/api";

const defaultForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterForm({ setUser }) {
  const navigate = useNavigate();

  // State
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [inputs, setInputs] = useState(defaultForm);

  // Handlers
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (inputs.password !== inputs.confirmPassword) {
      setError("passwords does not match");
      return;
    }

    try {
      const res = await apiRequest("POST", inputs, "/api/auth/register");

      if (!res.ok) {
        setError(res.data.message || "registration failed");
        return;
      }

      setSuccess(res.data.message || "registration successful");
      navigate("/");
      setInputs(defaultForm);
      setUser(result.data.user);
    } catch (err) {
      setError(err.message || " registration failed");
    }
  }

  // UI
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-background text-white p-4 sm:p-6">
      <form
        className="flex flex-col gap-4 w-full max-w-sm rounded-2xl border border-border bg-panel p-5 sm:p-7 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>

          <p className="text-muted text-sm mt-2">
            Welcome to Talk. Stay connected.
          </p>
        </div>

        {error && (
          <p className="bg-red-500/10 border border-danger/30 text-danger px-3 py-3 rounded-lg text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="bg-green-500/10 border border-green-400/30 text-green-400 px-3 py-3 rounded-lg text-sm">
            {success}
          </p>
        )}

        <input
          className="outline-none bg-surface border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 px-4 py-3 w-full rounded-xl text-sm transition-all placeholder:text-muted"
          name="username"
          onChange={(e) => {
            setInputs((old) => ({ ...old, username: e.target.value }));
          }}
          value={inputs.username}
          placeholder="Username"
          required
          type="text"
        />

        <input
          className="outline-none bg-surface border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 px-4 py-3 w-full rounded-xl text-sm transition-all placeholder:text-muted"
          name="email"
          onChange={(e) => {
            setInputs((old) => ({ ...old, email: e.target.value }));
          }}
          value={inputs.email}
          placeholder="Email"
          required
          type="email"
        />

        <input
          className="outline-none bg-surface border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 px-4 py-3 w-full rounded-xl text-sm transition-all placeholder:text-muted"
          name="password"
          onChange={(e) => {
            setInputs((old) => ({ ...old, password: e.target.value }));
          }}
          value={inputs.password}
          placeholder="Password"
          required
          type="password"
        />

        <input
          className="outline-none bg-surface border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 px-4 py-3 w-full rounded-xl text-sm transition-all placeholder:text-muted"
          name="confirmPassword"
          onChange={(e) => {
            setInputs((old) => ({ ...old, confirmPassword: e.target.value }));
          }}
          value={inputs.confirmPassword}
          placeholder="Confirm Password"
          required
          type="password"
        />

        <input
          className="outline-none cursor-pointer active:scale-[0.98] bg-foreground hover:bg-accent text-white font-semibold px-4 py-3 w-full rounded-xl text-sm transition-all mt-1"
          value="Create Account"
          type="submit"
        />

        <p className="text-center text-sm text-muted">
          Already have an account?
          <span
            className="text-foreground hover:text-accent cursor-pointer ml-1 transition-colors"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
