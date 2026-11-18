import React, { useCallback, useEffect, useState } from "react";
import apiRequest from "./services/api";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import RegisterForm from "./components/auth/RegisterForm";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login";

function PublicRoute({ user, children }) {
  return user ? <Navigate to="/" replace /> : children;
}
function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authorize = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiRequest("GET", null, "/api/auth/me");
      if (result.ok) {
        setUser(result.data.user);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    authorize();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute user={user}>
            <Login setUser={setUser} />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute user={user}>
            <RegisterForm setUser={setUser} />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Home setUser={setUser} user={user} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
export default App;
