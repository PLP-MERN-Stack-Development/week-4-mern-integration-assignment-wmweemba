import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({ onSuccess }) => {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(form);
    if (ok && onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          name="username"
          className="w-full border rounded px-3 py-2"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border rounded px-3 py-2"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm; 