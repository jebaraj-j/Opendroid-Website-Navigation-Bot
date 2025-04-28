"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X, Send, Maximize2, Minimize2, Mic } from "lucide-react"

export default function AiAssistant() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; customPayload?: { action: string; pageId: string } }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your TechGuide assistant. I can help you find the perfect products based on your needs. What are you looking for today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Function to start voice recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.interimResults = false

    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript) // Set the input field with the transcribed speech
    }

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event)
      setIsListening(false)
    }
  }

  // Function to speak text using TTS API
  async function speakText(text: string) {
    try {
      const response = await fetch("http://localhost:8000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch TTS audio")
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      const audio = new Audio(audioUrl)
      audio.play()
    } catch (error) {
      console.error("Error speaking text:", error)
    }
  }

  // Send message to the assistant
  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])

    // Simulate AI response
    setTimeout(() => {
      let targetPage = "careers"
      if (input.toLowerCase().includes("team")) targetPage = "team"
      if (input.toLowerCase().includes("research")) targetPage = "research"
      if (input.toLowerCase().includes("magazine")) targetPage = "magazine"
      if (input.toLowerCase().includes("home")) targetPage = "home"
      if (input.toLowerCase().includes("support")) targetPage = "support"

      const assistantMessage: { role: "assistant"; content: string; customPayload: { action: string; pageId: string } } = {
        role: "assistant",
        content: "Got it! Let me take you there.",
        customPayload: {
          action: "navigate",
          pageId: targetPage,
        },
      }
      

      setMessages((prev) => [...prev, assistantMessage])

      // Speak the assistant's response
      speakText(assistantMessage.content)

    }, 1000)

    setInput("")
  }

  // Scroll to page section if a customPayload:navigate is received
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]

    if (lastMessage?.customPayload?.action === "navigate") {
      const pageId = lastMessage.customPayload.pageId

      setTimeout(() => {
        const targetSection = document.getElementById(pageId)
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" })
        } else {
          console.warn(`No element found with id="${pageId}"`)
        }
      }, 100)
    }
  }, [messages])

  if (!hasMounted) return null

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 transition-all duration-300 ${
        isMinimized ? "w-72" : "w-80 sm:w-96"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h3 className="font-medium text-white">TechGuide Assistant</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-4 h-80 overflow-y-auto text-sm">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === "user" ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-grow bg-gray-800 text-white p-1 rounded-l-md focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-r-md"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>

              <button
                onClick={startSpeechRecognition}
                className={`ml-2 bg-green-600 p-2 rounded-full text-white ${isListening ? 'bg-green-400' : ''}`}
                title={isListening ? "Listening..." : "Click to speak"}
                aria-label="Start voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
