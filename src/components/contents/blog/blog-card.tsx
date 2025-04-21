"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, MessageSquare, Smile, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { detectEmotion } from "@/lib/emotion-detector"
import { BlogChatbot } from "@/components/contents/blog/blog-chatbot"
import { motion } from "framer-motion"

interface BlogPost {
    id: number
    title: string
    body: string
}

interface BlogCardProps {
    post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    const [showChatbot, setShowChatbot] = useState(false)
    const [showEmotionDetector, setShowEmotionDetector] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Create a short excerpt from the body
    const createExcerpt = (html: string) => {
        // Remove HTML tags and get plain text
        const plainText = html.replace(/<[^>]+>/g, "")
        // Return first 150 characters
        return plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "")
    }

    const emotion = detectEmotion(post.body)

    return (
        <motion.div whileHover={{ y: -5 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
            <Card className="h-full flex flex-col overflow-hidden border-amber-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 relative">
                {/* Emotion badge */}

                {/* More options button */}
                <div className="absolute top-2 right-2 z-10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-amber-100">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-amber-200 bg-white/90 backdrop-blur-sm">
                            <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="hover:bg-amber-50">
                                        <MessageSquare className="mr-2 h-4 w-4 text-kungfu-red" />
                                        <span>Chat about this post</span>
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] border-amber-200 bg-white/90 backdrop-blur-sm">
                                    <DialogHeader>
                                        <DialogTitle className="text-kungfu-red">Chat about</DialogTitle>
                                    </DialogHeader>
                                    <BlogChatbot postTitle={post.title} postId={post.id.toString()} />
                                </DialogContent>
                            </Dialog>

                            <Dialog open={showEmotionDetector} onOpenChange={setShowEmotionDetector}>
                                <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="hover:bg-amber-50">
                                        <Smile className="mr-2 h-4 w-4 text-amber-500" />
                                        <span>Detect emotion</span>
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] border-amber-200 bg-white/90 backdrop-blur-sm">
                                    <DialogHeader>
                                        <DialogTitle className="text-kungfu-red">Emotion Analysis</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex items-center justify-center p-6">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4 animate-bounce">{emotion.emoji}</div>
                                            <p className="text-xl font-bold text-kungfu-red">{emotion.name}</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {/*This post has a {emotion.name.toLowerCase()} tone based on its content.*/}
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-amber-100 to-red-100 transform rotate-45 translate-x-6 -translate-y-6"></div>
                </div>

                <CardHeader className="flex-1 pt-12">
                    {/*<div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">*/}
                    {/*    /!*<div className="flex items-center bg-amber-50 px-2 py-1 rounded-full">*!/*/}
                    {/*    /!*    /!*<Calendar className="w-3 h-3 mr-1 text-amber-500" />*!/*!/*/}
                    {/*    /!*    /!*{new Date(post.createAt).toLocaleDateString("en-US", {*!/*!/*/}
                    {/*    /!*    /!*    year: "numeric",*!/*!/*/}
                    {/*    /!*    /!*    month: "long",*!/*!/*/}
                    {/*    /!*    /!*    day: "numeric",*!/*!/*/}
                    {/*    /!*    /!*})}*!/*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}
                    <CardTitle className="text-xl hover:text-kungfu-red transition-colors flex items-center">
                        <BookOpen
                            className={`h-4 w-4 mr-2 text-amber-500 transition-transform duration-300 ${isHovered ? "rotate-12" : ""}`}
                        />
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">{createExcerpt(post.body)}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 pb-4">
                    <Button
                        asChild
                        className="w-full mt-auto bg-gradient-to-r from-kungfu-red to-red-600 hover:from-red-600 hover:to-kungfu-red text-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <Link href={`/blog/${post.id}`}>Read Full Post</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
