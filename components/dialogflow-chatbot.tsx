"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send } from "lucide-react";

export default function DialogflowChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const router = useRouter();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      const response = await fetch("http://localhost:3001/api/dialogflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
    
      const data = await response.json();
    
      // Show assistant message
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.fulfillmentText },
      ]);
    
      // ✅ Check and use payload
      if (data.payload && data.payload.pageUrl?.stringValue) {
        const pageUrl = data.payload.pageUrl.stringValue;
        router.push(pageUrl);
      }
    } catch (error) {
      console.error("Error sending message to Dialogflow:", error);
    }
    

    setInput(""); // Reset input after sending
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full"
        >
          <MessageSquare />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-lg p-4 w-80 shadow-xl z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Dialogflow Chat</h3>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>

          <div className="overflow-y-auto h-80 mb-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  msg.role === "user"
                    ? "text-right bg-gray-700"
                    : "text-left bg-gray-800"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-grow p-2 rounded bg-gray-800 text-white outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 p-2 rounded text-white"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
