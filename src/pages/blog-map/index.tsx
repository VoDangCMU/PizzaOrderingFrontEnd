"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Info } from "lucide-react"

const BlogMindmap = dynamic(() => import("@/components/contents/blog/blog-mindmap").then((mod) => mod.BlogMindmap), {
    ssr: false,
})

export default function BlogMapPage() {
    const [similarityThreshold, setSimilarityThreshold] = useState(0.3)
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 kungfu-text">Blog Mindmap</h1>
                        <p className="text-muted-foreground">Explore our pizza blog posts visually, connected by similarity</p>
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
                            <li>Drag to pan around the mindmap</li>
                            <li>Use the slider to adjust connection strength between related posts</li>
                            <li>Click on any node to view that blog post</li>
                            <li>Posts are connected based on shared tags and categories</li>
                        </ul>
                    </div>
                )}

                <div className="mb-6 flex items-center gap-4">
                    <div className="text-sm font-medium">Similarity Threshold:</div>
                    <div className="flex-1 max-w-xs">
                        <Slider
                            value={[similarityThreshold]}
                            min={0.1}
                            max={0.9}
                            step={0.1}
                            onValueChange={(value) => setSimilarityThreshold(value[0])}
                        />
                    </div>
                    <div className="text-sm text-muted-foreground w-10">{similarityThreshold.toFixed(1)}</div>
                </div>

                <div className="bg-white dark:bg-gray-900 border rounded-lg shadow-sm overflow-hidden h-[calc(100vh-240px)]">
                    <BlogMindmap similarityThreshold={similarityThreshold} />
                </div>
            </div>
        </div>
    )
}

