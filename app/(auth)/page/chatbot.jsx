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
        className="fixed right-4 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all duration-300"
        style={{
          bottom: isOpen ? "400px" : "1rem",
          zIndex: 1000,
        }}
        aria-label="Open chat assistant"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleChatToggle()}
      >
        {newMessage && !isOpen && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full" />
        )}
        <FaRobot size={28} />
      </div>

      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full max-w-xs bg-white border-2 border-blue-500 rounded-lg shadow-xl shadow-blue-500/50 z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-[#0a192f] text-white rounded-t-lg">
            <span className="text-sm font-semibold">Masresha&apos;s Assistant</span>
            <button
              type="button"
              onClick={clearChat}
              className="text-xs text-blue-200 hover:text-white underline"
              title="Clear chat and start new session"
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col h-[400px]">
            <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 max-w-[85%] rounded-lg break-words whitespace-pre-line text-sm leading-relaxed ${
                      chat.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {chat.sender === "bot" ? formatDisplayMessage(chat.message) : chat.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-gray-200 text-gray-600 text-sm">Typing...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="flex items-center space-x-2 p-2 border-t border-gray-100">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about experience, skills, contact..."
                maxLength={400}
                disabled={isLoading}
                autoComplete="off"
                className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={isLoading || !userMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[52px]"
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
