"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
    id: string
    content: string
    sender: "user" | "bot"
}

interface BlogChatbotProps {
    postTitle: string
    postId?: string
}

export function BlogChatbot({ postTitle, postId }: BlogChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: `Hi there! I'm your Võ Đang Pizza AI assistant. How can I help you with the article "${postTitle}"?`,
            sender: "bot",
        },
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return
        const ai_api = localStorage.getItem("ai_api")
        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        try {
            // Call the API with the required payload
            const response = await fetch(`${ai_api}/chatbot2`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idPost: postId,
                    question: userMessage.content,
                    token: "10",
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to get response from chatbot API")
            }

            const data = await response.json()

            // Create bot message from API response
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer || "I'm sorry, I couldn't find an answer to that question.",
                sender: "bot",
            }

            setMessages((prev) => [...prev, botMessage])
        } catch (error) {
            console.error("Error fetching chatbot response:", error)

            // Fallback message in case of error
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I'm sorry, I encountered an error while processing your question. Please try again later.",
                sender: "bot",
            }

            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSend()
        }
    }

    return (
        <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                {message.sender === "bot" && (
                                    <Avatar className="h-8 w-8 mr-2">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                        <AvatarFallback className="bg-kungfu-red text-white">VP</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`rounded-lg p-3 ${message.sender === "user" ? "bg-kungfu-red text-white" : "bg-muted"}`}
                                >
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex max-w-[80%] flex-row">
                                <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                    <AvatarFallback className="bg-kungfu-red text-white">VP</AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg p-3 bg-muted">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-kungfu-red rounded-full animate-bounce" />
                                        <div
                                            className="w-2 h-2 bg-kungfu-red rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-kungfu-red rounded-full animate-bounce"
                                            style={{ animationDelay: "0.4s" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div className="p-4 border-t flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question..."
                    className="flex-1"
                />
                <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-kungfu-red hover:bg-kungfu-darkRed"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
