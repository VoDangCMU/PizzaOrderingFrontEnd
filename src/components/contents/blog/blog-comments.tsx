"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

interface Comment {
    id: number
    author: string
    authorImage?: string
    content: string
    date: string
}

interface BlogCommentsProps {
    postId: number
}

// Mock comments data
const mockComments: Record<number, Comment[]> = {
    1: [
        {
            id: 1,
            author: "Master Wong",
            authorImage: "/placeholder.svg?height=40&width=40",
            content:
                "This pizza truly captures the essence of fire and passion. The balance of spice is perfect - challenging but not overwhelming.",
            date: "April 2, 2023",
        },
        {
            id: 2,
            author: "Sifu Chen",
            authorImage: "/placeholder.svg?height=40&width=40",
            content:
                "I was skeptical about the dragon fruit addition, but it provides a surprising coolness that balances the heat. Truly innovative!",
            date: "April 5, 2023",
        },
    ],
    4: [
        {
            id: 3,
            author: "Apprentice Wu",
            authorImage: "/placeholder.svg?height=40&width=40",
            content:
                "The Five Elements Supreme is a journey of flavors. Each section represents its element perfectly. Earth section with mushrooms was my favorite.",
            date: "June 10, 2023",
        },
    ],
}

export function BlogComments({ postId }: BlogCommentsProps) {
    const [comments, setComments] = useState<Comment[]>(mockComments[postId] || [])
    const [newComment, setNewComment] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmitComment = () => {
        if (!newComment.trim()) return

        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const comment: Comment = {
                id: Date.now(),
                author: "You",
                content: newComment,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            }

            setComments([...comments, comment])
            setNewComment("")
            setIsSubmitting(false)

            toast({
                title: "Comment posted",
                description: "Your comment has been added to the discussion.",
            })
        }, 1000)
    }

    return (
        <section>
            <motion.h3
                className="text-2xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Comments ({comments.length})
            </motion.h3>

            <motion.div
                className="space-y-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            className="flex gap-4 p-4 rounded-lg bg-muted/30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.authorImage} alt={comment.author} />
                                <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-medium">{comment.author}</h4>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                </div>
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-4">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </motion.div>

            <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <h4 className="font-medium">Add a comment</h4>
                <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                />
                <Button
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || isSubmitting}
                    className="bg-kungfu-red hover:bg-kungfu-darkRed text-white"
                >
                    {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
            </motion.div>
        </section>
    )
}

