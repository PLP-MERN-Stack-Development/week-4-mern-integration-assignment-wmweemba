import React, { createContext, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set token in localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // Optionally, fetch user info if token exists
  useEffect(() => {
    if (token && !user) {
      // You may want to fetch user profile here
      setUser({}); // Placeholder, replace with real fetch if needed
    }
  }, [token, user]);

  // Register
  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return true;
    } catch (err) {
      setError(err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setToken(json.token);
      setUser(json.user);
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 