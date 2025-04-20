"use client"

import { motion } from "framer-motion"
// import { BlogCard } from "./blog-card"

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
    similarity?: number
}

interface RelatedPostsProps {
    posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null

    return (
        <section>
            <motion.h3
                className="text-2xl font-bold mb-8 kungfu-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Related Articles
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    >
                        {/*<BlogCard post={post} />*/}
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
