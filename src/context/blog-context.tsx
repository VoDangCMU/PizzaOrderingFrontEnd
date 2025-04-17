"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface BlogPost {
    id: number
    title: string
    body: string
    date: string
    author: string
}

interface BlogContextType {
    blogPosts: BlogPost[]
    addBlogPost: (post: BlogPost) => void
    getBlogPost: (id: number) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

    useEffect(() => {
        const storedPosts = localStorage.getItem("blogPosts")
        if (storedPosts) {
            setBlogPosts(JSON.parse(storedPosts))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("blogPosts", JSON.stringify(blogPosts))
    }, [blogPosts])

    const addBlogPost = (post: BlogPost) => {
        setBlogPosts((prev) => [post, ...prev])
    }

    const getBlogPost = (id: number) => {
        return blogPosts.find((post) => post.id === id)
    }

    return <BlogContext.Provider value={{ blogPosts, addBlogPost, getBlogPost }}>{children}</BlogContext.Provider>
}

export function useBlogContext() {
    const context = useContext(BlogContext)
    if (context === undefined) {
        throw new Error("useBlogContext must be used within a BlogProvider")
    }
    return context
}
