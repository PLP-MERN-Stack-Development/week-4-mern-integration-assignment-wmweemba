import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
      <div className="text-xl font-bold">
        <Link to="/">MERN Blog</Link>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">Posts</Link>
        {token ? (
          <>
            <Link to="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition">New Post</Link>
            <span className="ml-2 text-sm">{user?.username}</span>
            <button onClick={handleLogout} className="ml-2 bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 