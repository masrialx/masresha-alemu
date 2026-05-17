"use client";

import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";

export default function Connection() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && title && description) {
      try {
        const response = await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, title, description }),
        });

        const result = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setMessage("Your message has been sent. I'll get back to you shortly!");
        } else {
          setIsSuccess(false);
          setMessage(result.message || "Something went wrong. Please try again.");
        }
      } catch {
        setIsSuccess(false);
        setMessage("An error occurred. Please try again later.");
      }
    } else {
      setIsSuccess(false);
      setMessage("All fields are required.");
    }
  };

  useEffect(() => {
    if (message) {
      setIsMessageVisible(true);
      const timer = setTimeout(() => {
        setIsMessageVisible(false);
        setEmail("");
        setTitle("");
        setDescription("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <section id="contact" className="section-shell bg-brand-navy">
      <div className="section-inner max-w-xl">
        <SectionHeader
          dark
          label="Contact"
          title="Get in Touch"
          subtitle="Have a project or opportunity? Send me a message"
        />

        {message && isMessageVisible && (
          <div
            className={`mb-6 rounded-xl px-4 py-3 text-center text-sm font-medium text-white ${
              isSuccess ? "bg-emerald-600" : "bg-rose-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-modern space-y-4 p-6 sm:p-8">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
              required
            />
          </div>

          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
              Subject
            </label>
            <input
              id="title"
              type="text"
              placeholder="What's this about?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              id="description"
              placeholder="Tell me about your project or role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20"
              rows={4}
              required
            />
          </div>

          <button type="submit" className="btn-accent w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
