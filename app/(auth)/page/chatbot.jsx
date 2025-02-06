"use client"; // Ensure this is a client component
import { useState } from "react";
import { FaRobot } from "react-icons/fa";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      const newChatHistory = [
        ...chatHistory,
        { sender: "user", message: userMessage },
      ];

      setChatHistory(newChatHistory);
      setUserMessage("");

      // Send the message to the backend (API route)
      try {
        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        });

        const data = await res.json();

        // Handle the bot response
        const botResponse = data?.message || "I am here to assist you with matters related to Masresha.";
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { sender: "bot", message: botResponse },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div>
      {/* Chatbot Icon */}
      <div
        onClick={handleChatToggle}
        className="fixed right-4 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all duration-300"
        style={{
          bottom: isOpen ? '400px' : '1rem', // Ensure the bottom spacing remains even when closed
          zIndex: 1000, // Ensure the icon is always on top of other elements
        }}
      >
        <FaRobot size={28} />
      </div>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 w-full max-w-xs bg-white border-2 border-blue-500 rounded-lg shadow-xl shadow-blue-500/50 z-50">
          <div className="flex flex-col h-[400px]">
            {/* Scrollable message history with fixed height */}
            <div
              className="flex-1 overflow-y-scroll p-2 space-y-2 text-sm"
            >
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`p-3 max-w-xs rounded-lg break-words ${
                      chat.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2 p-2">
              <input
                type="text"
                value={userMessage}
                onChange={handleUserMessageChange}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full p-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
