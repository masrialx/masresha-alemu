"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-blue-600");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate API call for password reset
    if (email === "user@example.com") {
      setMessage("Check your email box for reset instructions.");
      setMessageColor("text-blue-600");
    } else {
      setMessage("Error: Email not found.");
      setMessageColor("text-red-600");
    }

    // Reset the message after 5 seconds
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a192f]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-[#0a192f] mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#0a192f]"
            >
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
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>

      {/* Popup Message */}
      {message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg ${messageColor} bg-white`}
          style={{ zIndex: 1000 }}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
