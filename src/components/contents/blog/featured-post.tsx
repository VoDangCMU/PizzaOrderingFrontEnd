"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
    id: number
    title: string
    excerpt: string
    date: string
    author: string
    image: string
    rating: number
    category: string
    tags: string[]
}

interface FeaturedPostProps {
    post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <motion.div
            className="relative overflow-hidden rounded-xl kungfu-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video md:aspect-auto">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-kungfu-red text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{post.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="p-6 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {post.date}
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-4 kungfu-text">{post.title}</h2>

                    <p className="text-foreground/80 mb-6 flex-grow">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-kungfu-red/10">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <Button asChild className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                        <Link href={`/blog/${post.id}`}>Read Full Article</Link>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

