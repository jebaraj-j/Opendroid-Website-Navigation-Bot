'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X, Send, Maximize2, Minimize2 } from 'lucide-react'

export default function AiAssistant() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string; customPayload?: { action: string; pageId: string } }[]
  >([
    {
      role: 'assistant',
      content:
        "Hello! I'm your TechGuide assistant. I can help you find the perfect products based on your needs. What are you looking for today?",
    },
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: input }])

    // Simulate AI response
    setTimeout(() => {
      // Example of conditional logic to pick page
      let targetPage = 'careers'
      if (input.toLowerCase().includes('team')) targetPage = 'team'
      if (input.toLowerCase().includes('research')) targetPage = 'research'
      if (input.toLowerCase().includes('magazine')) targetPage = 'magazine'
      if (input.toLowerCase().includes('home')) targetPage = 'home'

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Got it! Let me take you there.",
          customPayload: {
            action: 'navigate',
            pageId: targetPage,
          },
        },
      ])
    }, 1000)

    setInput('')
  }

  // Trigger scroll if a customPayload with action:navigate is received
  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
  
    if (lastMessage?.customPayload?.action === "navigate") {
      const pageId = lastMessage.customPayload.pageId
  
      // Wait for DOM to render
      setTimeout(() => {
        const targetSection = document.getElementById(pageId)
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" })
        } else {
          console.warn(`No element found with id="${pageId}"`)
        }
      }, 100) // Delay to ensure DOM is updated
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
        isMinimized ? 'w-72' : 'w-80 sm:w-96'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <h3 className="font-medium text-white">TechGuide Assistant</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
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
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-white'
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
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-grow bg-gray-800 text-white p-2 rounded-l-md focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-r-md"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
