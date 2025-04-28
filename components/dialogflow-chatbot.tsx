"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send, Mic } from "lucide-react";

export default function DialogflowChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const router = useRouter();

  // ✅ Function to start voice recognition
  const startSpeechRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };
  };

  // ✅ Function to speak text using the TTS API
  async function speakText(text: string) {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }), // Ensure the text is passed correctly
      });

      if (!response.ok) {
        throw new Error("Failed to fetch TTS audio");
      }

      // Convert the response to a blob (audio content)
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create a new Audio object and play the audio
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error speaking text:", error);
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prevMessages) => [...prevMessages, { role: "user", content: input }]);

    try {
      const response = await fetch('http://localhost:3001/api/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      console.log("Response from Dialogflow:", response);
      const data = await response.json();

      // Show assistant message
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.fulfillmentText },
      ]);

      // ✅ Check and use payload
      if (data.payload && data.payload.pageUrl?.stringValue) {
        const pageUrl = data.payload.pageUrl.stringValue;
        router.push(pageUrl);
      }
      console.log("URL pushed");
      // Speak the assistant's response
      speakText(data.fulfillmentText);
      console.log("Speak text called");

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
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-lg p-4 w-100 shadow-xl z-50">
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
            <button
              onClick={startSpeechRecognition}
              className={`bg-green-400 p-2 rounded text-white ${isListening ? 'bg-green-600' : ''}`}
            >
              <Mic />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
