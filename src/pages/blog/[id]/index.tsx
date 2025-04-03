"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Star, Calendar, User, Share2 } from "lucide-react"
import { blogPosts } from "@/data/blog-posts"
import { BlogComments } from "@/components/contents/blog/blog-comments"
import { RelatedPosts } from "@/components/contents/blog/related-posts"
import { calculateSimilarity } from "@/lib/similarity"
import Image from "next/image"
import Link from "next/link";

export default function BlogPostPage() {
    const params = useParams()
    const router = useRouter()
    const [post, setPost] = useState<any>(null)
    const [relatedPosts, setRelatedPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const postId = Number(params.id)
        const foundPost = blogPosts.find((p) => p.id === postId)

        if (foundPost) {
            setPost(foundPost)

            const related = blogPosts
                .filter((p) => p.id !== postId)
                .map((p) => ({
                    ...p,
                    similarity: calculateSimilarity(foundPost, p),
                }))
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, 3)

            setRelatedPosts(related)
        }

        setLoading(false)
    }, [params.id])

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
                        <Link href="../blog">Back to Blog</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/blog")}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                </Button>

                <article className="max-w-4xl mx-auto">
                    <motion.header
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-kungfu-red text-white">{post.category}</Badge>
                            {post.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="bg-kungfu-red/10">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-4 kungfu-text">{post.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                            </div>
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                                <span>{post.rating.toFixed(1)}</span>
                            </div>
                        </div>
                    </motion.header>

                    <motion.div
                        className="relative aspect-video mb-8 rounded-xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </motion.div>

                    <motion.div
                        className="prose prose-lg max-w-none mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="lead text-xl mb-6">{post.excerpt}</p>

                        <h2>The Art of Pizza Making</h2>
                        <p>
                            At Võ Đang Pizza, we believe that making pizza is not just cooking it is a form of martial art. Each
                            movement, from kneading the dough to arranging the toppings, requires precision, discipline, and years of
                            practice to master.
                        </p>

                        <p>
                            The {post.title} exemplifies this philosophy. Our master chefs train for years to perfect the balance of
                            flavors and textures that make this pizza special. Like a kung fu master who understands that true power
                            comes from harmony and balance, our pizza artisans know that the perfect pizza is about the harmony of
                            ingredients.
                        </p>

                        <h2>Ingredients and Preparation</h2>
                        <p>
                            We source only the finest ingredients for our {post.title}. The dough is prepared 48 hours in advance,
                            allowing it to develop complex flavors through slow fermentation. This patience is reminiscent of the
                            martial arts philosophy that mastery cannot be rushed.
                        </p>

                        <p>
                            The sauce is made from San Marzano tomatoes, hand-crushed and simmered with a secret blend of herbs. Our
                            cheese is a special mixture that provides the perfect melt and stretch. And the toppings are arranged with
                            the precision of a martial arts form, ensuring every bite delivers the perfect balance of flavors.
                        </p>

                        <h2>The Tasting Experience</h2>
                        <p>
                            When you take your first bite of the {post.title}, you will understand why we consider pizza-making a
                            martial art. The crispy yet chewy crust, the tangy sauce, the melty cheese, and the perfectly balanced
                            toppings create a symphony of flavors that is both powerful and harmonious.
                        </p>

                        <p>
                            Like a well-executed kung fu move, this pizza appears simple but contains layers of complexity that reveal
                            themselves with each bite. It is an experience that engages all your senses and leaves you with a deep
                            appreciation for the craft.
                        </p>

                        <h2>Conclusion</h2>
                        <p>
                            The {post.title} is not just food it is a testament to our dedication to the art of pizza-making. We invite
                            you to experience this masterpiece for yourself and discover why our customers consider it one of the
                            finest pizzas they have ever tasted.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-between py-6 border-t border-b mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="text-sm font-medium">Share this article</div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>

                    <BlogComments postId={post.id} />
                </article>

                <div className="mt-16">
                    <RelatedPosts posts={relatedPosts} />
                </div>
            </div>
        </div>
    )
}

