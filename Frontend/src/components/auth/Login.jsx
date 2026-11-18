import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/api";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  // State
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Handlers
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const result = await apiRequest("POST", inputs, "/api/auth/login");

      if (!result.ok) {
        setError(result.data.message || "Login Failed");
        return;
      }

      setSuccess(result.data.message || "Login Successful");
      setInputs({
        email: "",
        password: "",
      });

      navigate("/");
      console.log(result);
      setUser(result.data.user);
    } catch (err) {
      setError(err.message || "Login Failed");
    }
  }

  // UI
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-background text-white p-4 sm:p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-full max-w-sm rounded-2xl border border-border bg-panel p-5 sm:p-7 shadow-2xl"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>

          <p className="text-muted text-sm mt-2">
            Sign in to continue to Talk.
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
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e) => {
            setInputs((old) => ({
              ...old,
              email: e.target.value,
            }));
          }}
          required
        />

        <input
          className="outline-none bg-surface border border-border focus:border-foreground focus:ring-2 focus:ring-foreground/20 px-4 py-3 w-full rounded-xl text-sm transition-all placeholder:text-muted"
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e) => {
            setInputs((old) => ({
              ...old,
              password: e.target.value,
            }));
          }}
          required
        />

        <div className="flex justify-end">
          <span className="text-sm text-foreground hover:text-accent cursor-pointer transition-colors">
            Forgot password?
          </span>
        </div>

        <input
          className="outline-none cursor-pointer active:scale-[0.98] bg-foreground hover:bg-accent text-white font-semibold px-4 py-3 w-full rounded-xl text-sm transition-all"
          type="submit"
          value="Login"
        />

        <p className="text-center text-sm text-muted">
          Don't have an account?
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-foreground hover:text-accent cursor-pointer ml-1 transition-colors"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
