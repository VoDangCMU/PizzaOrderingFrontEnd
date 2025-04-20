"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModernLogo } from "@/components/layouts/modern-logo"

interface Message {
    id: string
    content: string
    sender: "user" | "assistant"
    timestamp: Date
}

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hi there! I'm your Võ Đang Pizza assistant. How can I help you today?",
            sender: "assistant",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const ai_api = localStorage.getItem("ai_api")
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

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsTyping(true)

        try {
            const res = await fetch(`${ai_api}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: input,
                }),
            })

            const data = await res.json()

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.response || "Sorry, I didn't get that.",
                sender: "assistant",
                timestamp: new Date(),
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (err) {
            console.error("Failed to fetch AI response:", err)

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    content: "Oops! Something went wrong. Please try again later.",
                    sender: "assistant",
                    timestamp: new Date(),
                },
            ])
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
        <>
            <motion.div className="fixed bottom-6 right-6 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 btn-hover"
                    aria-label="Open chat assistant"
                >
                    <MessageCircle className="h-6 w-6 text-white" />
                </Button>
            </motion.div>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden glassmorphism border-primary/20"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        {/* Chat header */}
                        <div className="bg-gradient-to-r from-primary to-accent p-3 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <ModernLogo className="h-8 w-8" />
                                <div>
                                    <h3 className="font-bold text-white">Pizza Assistant</h3>
                                    <p className="text-xs text-white/80">Powered by Võ Đang AI</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        {/* Chat messages */}
                        <div className="bg-transparent">
                            <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                                        >
                                            {message.sender === "assistant" && (
                                                <Avatar className="h-8 w-8 mr-2">
                                                    <AvatarImage src="/assistant-avatar.png" alt="Assistant" />
                                                    <AvatarFallback className="bg-primary text-white">PA</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div
                                                className={`rounded-lg p-3 ${
                                                    message.sender === "user" ? "bg-primary text-white" : "bg-secondary/80 backdrop-blur-sm"
                                                }`}
                                            >
                                                <p>{message.content}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start mb-4">
                                        <div className="flex max-w-[80%] flex-row">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src="/assistant-avatar.png" alt="Assistant" />
                                                <AvatarFallback className="bg-primary text-white">PA</AvatarFallback>
                                            </Avatar>
                                            <div className="rounded-lg p-3 bg-secondary/80 backdrop-blur-sm">
                                                <div className="flex space-x-1">
                                                    <motion.div
                                                        className="w-2 h-2 bg-primary rounded-full"
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-primary rounded-full"
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-primary rounded-full"
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ScrollArea>

                            {/* Chat input */}
                            <div className="p-3 border-t border-border/30 bg-transparent flex items-center space-x-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about our pizzas..."
                                    className="flex-1 bg-white/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
                                />
                                <Button
                                    onClick={handleSend}
                                    size="icon"
                                    className="bg-primary hover:bg-primary/90 text-white btn-hover"
                                    disabled={!input.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

