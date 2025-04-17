"use client"

import { motion } from "framer-motion"
import { BlogCard } from "./blog-card"
import { EmptyResults } from "./empty-results"

interface BlogPost {
    id: number
    title: string
    body: string
    createAt: Date
}

interface BlogGridProps {
    posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) {
        return <EmptyResults />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                >
                    <BlogCard post={post} />
                </motion.div>
            ))}
        </div>
    )
}
