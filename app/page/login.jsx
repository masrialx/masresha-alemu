// app/page/login.jsx
"use client";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a192f]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#0a192f] mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-[#0a192f]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border-2 border-[#0a192f] rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-semibold text-[#0a192f]">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border-2 border-[#0a192f] rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
