"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"

interface Blog {
    id: number
    title: string
}

interface BlogSearchProps {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function BlogSearch({ searchTerm, onSearchChange }: BlogSearchProps) {
    const router = useRouter()
    const [suggestions, setSuggestions] = useState<Blog[]>([])
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm.trim()) {
                setSuggestions([])
                return
            }

            try {
                const response = await axios.get(`/api/blog/search?query=${encodeURIComponent(searchTerm)}`)
                if (response.status === 200) {
                    setSuggestions(response.data.data.slice(0, 5)) // giới hạn 5 kết quả
                }
            } catch (error) {
                console.error("Failed to fetch suggestions:", error)
            }
        }

        const delay = setTimeout(() => {
            fetchSuggestions()
        }, 300)

        return () => clearTimeout(delay)
    }, [searchTerm])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            router.push(`/blog-map?keyword=${encodeURIComponent(searchTerm)}`)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold mb-4">Search</h3>
            <form onSubmit={handleSubmit} className="relative">
                <Input
                    type="search"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => {
                        onSearchChange(e.target.value)
                        setIsTyping(true)
                    }}
                    className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </form>

            {/* Suggestions */}
            {searchTerm && suggestions.length > 0 && (
                <div className="absolute z-20 w-full bg-white border mt-1 rounded-lg shadow-lg">
                    {suggestions.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog-map?keyword=${encodeURIComponent(post.title)}`}
                            className="block px-4 py-2 hover:bg-amber-100 text-sm cursor-pointer"
                        >
                            {post.title}
                        </Link>
                    ))}
                </div>
            )}
        </motion.div>
    )
}
