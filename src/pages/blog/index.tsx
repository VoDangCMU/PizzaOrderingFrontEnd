"use client"

import { useState } from "react"
import { BlogHeader } from "@/components/contents/blog/blog-header"
import { BlogGrid } from "@/components/contents/blog/blog-grid"
import { BlogCategories } from "@/components/contents/blog/blog-categories"
import { BlogSearch } from "@/components/contents/blog/blog-search"
import { FeaturedPost } from "@/components/contents/blog/featured-post"
import { blogPosts } from "@/data/blog-posts"

export default function BlogPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const featuredPost = [...blogPosts].sort((a, b) => b.rating - a.rating)[0]

    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    const categories = ["All", ...new Set(blogPosts.map((post) => post.category))]

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <BlogHeader />

                <div className="mb-12">
                    <FeaturedPost post={featuredPost} />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/4">
                        <div className="sticky top-24">
                            <BlogSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                            <div className="mt-8">
                                <BlogCategories
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={setSelectedCategory}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="md:w-3/4">
                        <BlogGrid posts={filteredPosts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

