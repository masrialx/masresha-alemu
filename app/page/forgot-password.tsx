// app/pages/forgot-password.tsx

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-blue-600");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call for password reset
    if (email === "user@example.com") {
      // Simulate successful password reset
      setMessage("Check your email box for reset instructions.");
      setMessageColor("text-blue-600");
    } else {
      // Simulate error (email not found)
      setMessage("Error: Email not found.");
      setMessageColor("text-red-600");
    }

    // Reset the message after 5 seconds
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm">
            <Link href="/login">
              <a className="text-blue-600 hover:underline">Back to Login</a>
            </Link>
          </p>
        </div>
      </div>

      {/* Popup Message */}
      {message && (
        <div
          className={`fixed top-0 left-0 w-full text-center py-2 ${messageColor} transition-all duration-300`}
          style={{ zIndex: 1000 }}
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
