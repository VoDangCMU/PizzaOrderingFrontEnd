import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    Calendar,
    MoreHorizontal,
    MessageSquare,
    Smile,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { detectEmotion } from "@/lib/emotion-detector"
import { BlogChatbot } from "@/components/contents/blog/blog-chatbot"
import Link from "next/link";
import axios from "axios";
import FeaturedPizzas from "@/components/contents/featured-pizzas";

interface Blog {
    id: number
    title: string
    body: string
    createdAt: string
}

export default function BlogPostPage() {
    const params = useParams()
    const router = useRouter()
    const [post, setPost] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const [showChatbot, setShowChatbot] = useState(false)
    const [showEmotionDetector, setShowEmotionDetector] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postId = Number(params.id)
                const response = await axios.get(`/api/blog/by-id/${postId}`)

                if (response.status === 200) {
                    setPost(response.data.data)
                } else {
                    router.push("/blog")
                }
            } catch (error) {
                console.error("Failed to fetch blog post:", error)
                router.push("/blog")
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [params.id, router])


    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading post...</p>
                </div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Post not found</p>
                    <Button asChild className="mt-4">
                        <Link href="/blog">Back to Blog</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const emotion = post ? detectEmotion(post.body) : { name: "Informative", emoji: "📚" }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-amber-50/50 via-white to-red-50/30">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 relative z-10">
                <div className="flex justify-between items-center mb-6">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/blog")}
                        className="hover:bg-amber-100 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Blog
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-amber-100 transition-colors">
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
                                        {/*<DialogTitle className="text-kungfu-red">Chat about "{post.title}"</DialogTitle>*/}
                                    </DialogHeader>
                                    <BlogChatbot postTitle={post.title} />
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
                                                This post has a {emotion.name} tone based on its content.
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <article className="max-w-4xl mx-auto">
                    <motion.header
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-kungfu-red via-red-600 to-amber-700 bg-clip-text text-transparent">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4 mr-1 text-amber-500" />
                                {new Date(post.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                        </div>
                    </motion.header>

                    <motion.div
                        className="prose prose-lg max-w-none mb-12 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-amber-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </article>
            </div>
        </div>
    )
}
