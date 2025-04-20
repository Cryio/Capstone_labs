"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Mic } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatbotDialog() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Zen AI assistant. How can I help you with your habits today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on your habit tracking, I notice you've been consistent with meditation. Great job!",
        "I see you're working on reading more. Have you tried setting a specific time each day for this habit?",
        "For your exercise goal, breaking it into smaller sessions might help you stay consistent.",
        "Remember that consistency is more important than perfection. Keep going!",
        "Your Zen Garden is growing nicely! The meditation flowers are particularly flourishing.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const startSpeechRecognition = () => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        alert("Speech recognition failed: " + event.error)
      }

      recognition.start()
    } else {
      alert("Speech recognition is not supported in your browser.")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Zen AI Assistant</DialogTitle>
          <DialogDescription>Get personalized habit tips and insights from your AI assistant.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[350px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4 pt-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button variant="outline" size="icon" onClick={startSpeechRecognition} type="button">
              <Mic className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSend} type="button">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

