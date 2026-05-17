"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaRobot } from "react-icons/fa";

const GREETING =
  "Hi! I'm Masresha's assistant. Ask about his experience, skills, or contact info.";

/** Strip markdown asterisks if any slip through from the API */
function formatDisplayMessage(text) {
  if (!text) return text;
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^\s*[\*\-]\s+/gm, "• ")
    .replace(/\*\*/g, "");
}

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function clearStoredChat() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem("portfolio_chat_history_v1");
    sessionStorage.removeItem("portfolio_chat_greeted_v1");
    sessionStorage.removeItem("portfolio_chat_session_v1");
    sessionStorage.removeItem("chatHistory");
    localStorage.removeItem("chatHistory");
  } catch {
    // ignore
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState(false);
  const [greetingSent, setGreetingSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sessionIdRef = useRef("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    clearStoredChat();
    sessionIdRef.current = createSessionId();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isOpen, isLoading]);

  const handleBotMessage = useCallback((message) => {
    setChatHistory((prev) => [...prev, { sender: "bot", message }]);
    setNewMessage(true);
  }, []);

  const sendGreetingIfNeeded = useCallback(() => {
    if (!greetingSent) {
      handleBotMessage(GREETING);
      setGreetingSent(true);
    }
  }, [greetingSent, handleBotMessage]);

  const handleChatToggle = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening) {
      sendGreetingIfNeeded();
      setNewMessage(false);
    }
  };

  const buildApiHistory = (history) =>
    history.slice(-10).map((h) => ({
      role: h.sender === "user" ? "user" : "assistant",
      content: h.message,
    }));

  const handleSendMessage = async () => {
    const text = userMessage.trim().slice(0, 400);
    if (!text || isLoading) return;

    const userEntry = { sender: "user", message: text };
    const historyWithUser = [...chatHistory, userEntry];
    setChatHistory(historyWithUser);
    setUserMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: buildApiHistory(historyWithUser.slice(0, -1)),
          sessionId: sessionIdRef.current,
          _hp: "",
        }),
      });

      const data = await res.json();

      if (res.status === 429) {
        handleBotMessage(data?.error || "Please wait a moment before sending another message.");
        return;
      }

      if (!res.ok) {
        handleBotMessage(data?.error || "Something went wrong. Please try again.");
        return;
      }

      handleBotMessage(
        data?.message || "I can only help with questions about Masresha's professional background."
      );
    } catch {
      handleBotMessage("Connection issue. Please try again in a moment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setChatHistory([]);
    setGreetingSent(false);
    sessionIdRef.current = createSessionId();
    handleBotMessage(GREETING);
    setGreetingSent(true);
  };

  useEffect(() => {
    setNewMessage(true);
  }, []);

  return (
    <>
      <div
        onClick={handleChatToggle}
        className="fixed right-4 z-[1000] flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-sky-500 text-white shadow-glow transition-all duration-300 hover:scale-105"
        style={{
          bottom: isOpen ? "420px" : "1.25rem",
        }}
        aria-label="Open chat assistant"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleChatToggle()}
      >
        {newMessage && !isOpen && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-white ring-2 ring-rose-500" />
        )}
        <FaRobot size={28} />
      </div>

      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full max-w-sm overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:bottom-4 sm:right-4 sm:rounded-2xl">
          <div className="flex items-center justify-between bg-brand-navy px-4 py-3 text-white">
            <span className="text-sm font-semibold">Masresha&apos;s Assistant</span>
            <button
              type="button"
              onClick={clearChat}
              className="text-xs text-sky-300 hover:text-white"
              title="Clear chat and start new session"
            >
              Clear
            </button>
          </div>
          <div className="flex h-[400px] flex-col">
            <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] break-words whitespace-pre-line rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                      chat.sender === "user"
                        ? "bg-brand-navy text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {chat.sender === "bot" ? formatDisplayMessage(chat.message) : chat.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-100 px-3 py-2.5 text-sm text-slate-500">Typing...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 p-3">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about experience, skills..."
                maxLength={400}
                disabled={isLoading}
                autoComplete="off"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading || !userMessage.trim()}
                className="min-w-[52px] rounded-xl bg-rose-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
