import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function ChatBoxComponent() {
    const [messages, setMessages] = useState<{ text: string; isOwn: boolean }[]>([]);
    const [input, setInput] = useState("");
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages((prevMessages) => [...prevMessages, { text: input, isOwn: true }]);
        setInput("");

        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, { text: "Đây là phản hồi từ máy tính", isOwn: false }]);
        }, 1000);
    };

    useEffect(() => {
        if (messagesRef.current && !isUserScrolling) {
            messagesRef.current.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [isUserScrolling,messages]);

    const handleScroll = () => {
        if (messagesRef.current) {
            const isAtBottom = messagesRef.current.scrollHeight - messagesRef.current.scrollTop === messagesRef.current.clientHeight;
            setIsUserScrolling(!isAtBottom);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>Click me</DialogTrigger>
            <DialogContent className="bg-white text-black">
                <DialogTitle className="text-center">Chat box</DialogTitle>
                <Card className="h-96 overflow-y-auto flex flex-col-reverse" ref={messagesRef} onScroll={handleScroll}>
                    <CardContent className="flex flex-col space-y-4 p-2 h-auto">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4}}
                                className={`p-3 rounded-lg w-fit max-w-xs break-words shadow-md
                                    ${msg.isOwn ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-300 text-black self-start mr-auto"}`}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                    </CardContent>
                </Card>
                <DialogFooter className="flex items-center gap-2">
                    <div className="flex w-full">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter message..."
                            className="flex-1 resize-none overflow-hidden break-words"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                        />
                        <Button onClick={sendMessage}>Send</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}