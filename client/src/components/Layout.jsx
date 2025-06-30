import React from "react";
import Navigation from "./Navigation";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <Navigation />
    <main className="max-w-3xl mx-auto p-4 mt-6">{children}</main>
  </div>
);

export default Layout; 