"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, Search } from "lucide-react"
import { SearchTreeMindmap } from "@/components/contents/blog/search-tree-mindmap"

export default function BlogMapPage() {
    const [showInfo, setShowInfo] = useState(false)
    const [searchTerm, setSearchTerm] = useState("pizza")
    const [inputValue, setInputValue] = useState("pizza")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputValue.trim()) {
            setSearchTerm(inputValue)
        }
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 kungfu-text">Blog Mindmap</h1>
                        <p className="text-muted-foreground">Explore our pizza blog posts visually based on search relevance</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="icon" onClick={() => setShowInfo(!showInfo)} className="text-kungfu-red">
                            <Info className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {showInfo && (
                    <div className="bg-muted/50 p-4 rounded-lg mb-6 text-sm">
                        <h3 className="font-medium mb-2">How to use this mindmap:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Enter a search term to see related blog posts</li>
                            <li>The leftmost node represents your search term</li>
                            <li>Posts are arranged horizontally by relevance - closer means more relevant</li>
                            <li>Posts are color-coded by category</li>
                            <li>Hover over nodes to see more details</li>
                            <li>Click on any node to view that blog post</li>
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Enter search term..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button type="submit" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                        Search
                    </Button>
                </form>

                <div className="bg-white dark:bg-gray-900 border rounded-lg shadow-sm overflow-hidden h-[calc(100vh-320px)]">
                    <SearchTreeMindmap searchTerm={searchTerm} />
                </div>
            </div>
        </div>
    )
}
