"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PenSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { BlogHeader } from "@/components/contents/blog/blog-header"
import { BlogGrid } from "@/components/contents/blog/blog-grid"
import { BlogSearch } from "@/components/contents/blog/blog-search"
import { EmptyResults } from "@/components/contents/blog/empty-results"
import { motion } from "framer-motion"
import axios from "axios";

interface Blog {
    id: number
    title: string
    body: string
    createAt: Date
}

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<Blog[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPosts, setFilteredPosts] = useState(blogPosts)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get("/api/blog/get-all")
                if (response.status === 200) {
                    const posts = response.data.data
                    setBlogPosts(posts)
                }
            } catch (error) {
                console.error("Failed to fetch blog posts:", error)
            }
        }

        if (blogPosts.length === 0) {
            fetchBlogPosts()
        }
    }, [blogPosts.length, setBlogPosts])

    // Filter posts based on search
    useEffect(() => {
        setIsLoading(true)

        setTimeout(() => {
            let filtered = [...blogPosts]

            // Filter by search term
            if (searchTerm) {
                const term = searchTerm.toLowerCase()
                filtered = filtered.filter(
                    (post) => post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term),
                )
            }

            setFilteredPosts(filtered)
            setIsLoading(false)
        }, 300)
    }, [searchTerm, blogPosts])

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-amber-50/50 via-white to-red-50/30">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-1/3 -left-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container px-4 relative z-10">
                <BlogHeader />

                <motion.div
                    className="flex justify-end mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Button
                        asChild
                        className="bg-gradient-to-r from-kungfu-red to-red-600 hover:from-red-600 hover:to-kungfu-red text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <Link href="/blog-upload" className="flex items-center">
                            <PenSquare className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Write New Post</span>
                            <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    </Button>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <div className="sticky top-24">
                            <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                            {/* Decorative element */}
                            <div className="hidden md:block mt-8 p-6 rounded-xl bg-gradient-to-br from-amber-50 to-red-50 border border-amber-100 shadow-sm">
                                <h3 className="text-lg font-bold text-kungfu-red mb-3 flex items-center">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Blog Highlights
                                </h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-kungfu-red rounded-full mr-2"></span>
                                        <span>Ancient pizza techniques</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                                        <span>Martial arts philosophy</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                                        <span>Balanced nutrition</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                                        <span>Mindful eating practices</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-3/4">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-12 h-12 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredPosts.length > 0 ? (
                            <BlogGrid posts={filteredPosts} />
                        ) : (
                            <EmptyResults />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
