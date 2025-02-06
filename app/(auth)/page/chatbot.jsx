"use client"; // Ensure this is a client component
import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import "./styles/chatbot.css"; // Import the CSS file

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
            contents: [{ parts: [{ text: userMessage }] }],
          }),
        });

        const data = await res.json();

        // Handle the bot response
        const botResponse = data?.generatedContent || "I'm here to assist you!";
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
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all duration-300"
      >
        <FaRobot size={28} />
      </div>

      {/* Chatbox */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-96 h-80 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="p-4 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4 text-sm">
              {/* Chat History */}
              <div className="space-y-2">
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`p-3 max-w-xs rounded-lg ${
                        chat.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                      }`}
                    >
                      <div
                        className={`chat-message ${chat.sender === "bot" ? "typing-effect" : ""}`}
                      >
                        {chat.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userMessage}
                onChange={handleUserMessageChange}
                onKeyDown={handleKeyPress}  // Listen for Enter key press
                placeholder="Type your message..."
                className="w-full p-2 text-sm border border-gray-300 rounded-lg"
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
