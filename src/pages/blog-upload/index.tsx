"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { RichTextEditor } from "@/components/contents/blog/rich-text-editor"
import { FileText, Save, Sparkles, BookOpen, Lightbulb } from "lucide-react"
import { useBlogContext } from "@/context/blog-context"

export default function BlogUploadPage() {
    const router = useRouter()
    const { addBlogPost } = useBlogContext()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !body.trim()) {
            toast({
                title: "Missing information",
                description: "Please provide both title and content for your blog post.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Create new blog post
            const newPost = {
                id: Date.now(),
                title,
                body,
                date: new Date().toISOString(),
                author: "Master Wong", // In a real app, this would be the logged-in user
            }

            // Add to context
            addBlogPost(newPost)

            toast({
                title: "Blog post published!",
                description: "Your blog post has been successfully published.",
            })

            // Redirect to blog page
            router.push("/blog")
        } catch {
            toast({
                title: "Error publishing post",
                description: "There was an error publishing your blog post. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-amber-50/50 via-white to-red-50/30">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 relative z-10">
                <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <motion.div
                                initial={{ rotate: 0 }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full blur-md opacity-50"></div>
                                <div className="relative bg-white rounded-full p-4">
                                    <FileText className="h-12 w-12 text-kungfu-red" />
                                </div>
                            </motion.div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-kungfu-red via-red-600 to-amber-700 bg-clip-text text-transparent">
                            Create New Blog Post
                        </h1>
                        <p className="text-muted-foreground">
                            Share your knowledge and experiences with the Võ Đang Pizza community
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Card className="border-amber-200 bg-white/90 backdrop-blur-sm shadow-md overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-amber-50 to-red-50 border-b border-amber-100">
                                <CardTitle className="text-kungfu-red flex items-center">
                                    <BookOpen className="h-5 w-5 mr-2" />
                                    Blog Post Editor
                                </CardTitle>
                                <CardDescription>Fill in the details of your new blog post</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-base font-medium flex items-center">
                                                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                                                Post Title
                                            </Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Enter a captivating title..."
                                                className="border-amber-200 focus-visible:ring-kungfu-red text-lg bg-amber-50/50"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="body" className="text-base font-medium flex items-center">
                                                <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                                                Post Content
                                            </Label>
                                            <div className="border border-amber-200 rounded-md overflow-hidden">
                                                <RichTextEditor value={body} onChange={setBody} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-kungfu-red to-red-600 hover:from-red-600 hover:to-kungfu-red text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    Publishing...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                                    Publish Post
                                                    <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Writing tips section */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-amber-200 shadow-sm"
                    >
                        <h3 className="text-lg font-bold text-kungfu-red mb-4 flex items-center">
                            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                            Writing Tips for Great Blog Posts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                <h4 className="font-medium text-amber-800 mb-2">Craft an Engaging Title</h4>
                                <p className="text-muted-foreground">
                                    Use descriptive, intriguing titles that capture the essence of your post and draw readers in.
                                </p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <h4 className="font-medium text-red-800 mb-2">Structure Your Content</h4>
                                <p className="text-muted-foreground">
                                    Use headings, subheadings, and paragraphs to organize your thoughts and make your post easy to read.
                                </p>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                <h4 className="font-medium text-orange-800 mb-2">Add Visual Elements</h4>
                                <p className="text-muted-foreground">
                                    Include images, quotes, or lists to break up text and enhance your message.
                                </p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <h4 className="font-medium text-yellow-800 mb-2">Proofread Carefully</h4>
                                <p className="text-muted-foreground">
                                    Check for spelling, grammar, and clarity before publishing to maintain professionalism.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
