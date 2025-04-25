"use client";
import React, { useState } from "react";
import { Phone } from "lucide-react";

export default function SupportPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to Opendroid. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold mb-6">Support</h1>

      {/* Chat Box */}
      <div className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Chat Support</h2>
        <div className="h-64 overflow-y-auto bg-gray-800 p-3 rounded-lg space-y-2 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-2 rounded-lg ${
                msg.sender === "bot"
                  ? "bg-blue-700 text-white self-start"
                  : "bg-gray-700 ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>

      {/* Call Support */}
      <div className="w-full max-w-xl bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Call Support</h2>
        <p className="mb-4">Need immediate assistance? Give us a call!</p>
        <a
          href="tel:+1234567890"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
        >
          <Phone className="h-5 w-5" />
          Call Us
        </a>
      </div>
    </div>
  );
}
