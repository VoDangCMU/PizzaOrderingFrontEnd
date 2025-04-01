"use client"

import { useEffect, useRef, useState } from "react"
import { Graph } from "@antv/x6"
import { useRouter } from "next/navigation"
import { blogPosts } from "@/data/blog-posts"
import { calculateSimilarity } from "@/lib/similarity"

interface BlogMindmapProps {
    similarityThreshold: number
}

export function BlogMindmap({ similarityThreshold }: BlogMindmapProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const graphRef = useRef<Graph | null>(null)
    const router = useRouter()
    const [isInitialized, setIsInitialized] = useState(false)
    const [nodeRegistered, setNodeRegistered] = useState(false)

    // Register custom node
    useEffect(() => {
        if (nodeRegistered) return

        try {
            // Register custom node - without checking if it exists
            Graph.registerNode(
                "blog-node",
                {
                    inherit: "circle",
                    width: 120,
                    height: 120,
                    attrs: {
                        body: {
                            strokeWidth: 2,
                            stroke: "#b71c1c",
                            fill: "#fff",
                            rx: 60,
                            ry: 60,
                        },
                        label: {
                            fontSize: 12,
                            fill: "#333",
                            textWrap: {
                                width: 100,
                                height: 100,
                                ellipsis: true,
                            },
                            refX: 0.5,
                            refY: 0.5,
                            textAnchor: "middle",
                            textVerticalAnchor: "middle",
                        },
                        image: {
                            "xlink:href": "",
                            width: 40,
                            height: 40,
                            refX: 0.5,
                            refY: 0.3,
                            refX2: -20,
                            refY2: -20,
                        },
                    },
                },
                true,
            )
            setNodeRegistered(true)
        } catch (error) {
            console.error("Error registering node:", error)
            // If registration fails, we'll still set it as registered to avoid repeated attempts
            setNodeRegistered(true)
        }
    }, [nodeRegistered])

    // Initialize the graph
    useEffect(() => {
        if (!containerRef.current || !nodeRegistered) return

        // Create the graph
        const graph = new Graph({
            container: containerRef.current,
            grid: {
                visible: true,
                type: "doubleMesh",
                args: [
                    {
                        color: "#eee",
                        thickness: 1,
                    },
                    {
                        color: "#ddd",
                        thickness: 1,
                        factor: 4,
                    },
                ],
            },
            connecting: {
                anchor: "center",
                connectionPoint: "anchor",
                connector: {
                    name: "smooth",
                },
                router: {
                    name: "er",
                    args: {
                        direction: "H",
                    },
                },
            },
            interacting: {
                nodeMovable: false,
            },
            panning: true,
            mousewheel: {
                enabled: true,
                modifiers: ["ctrl", "meta"],
            },
        })

        graphRef.current = graph

        // Add click event to nodes
        graph.on("node:click", ({ node }) => {
            const blogId = node.id
            router.push(`/blog/${blogId}`)
        })

        setIsInitialized(true)

        return () => {
            graph.dispose()
        }
    }, [router, nodeRegistered])

    // Update the graph when similarity threshold changes
    useEffect(() => {
        if (!graphRef.current || !isInitialized) return

        const graph = graphRef.current
        graph.clearCells()

        // Create nodes for each blog post
        const nodes = blogPosts.map((post) => {
            return graph.addNode({
                id: post.id.toString(),
                shape: "blog-node",
                label: post.title,
                attrs: {
                    body: {
                        fill: post.category === "Specialty" ? "#ffebee" : post.category === "Vegetarian" ? "#e8f5e9" : "#fff3e0",
                        stroke: post.category === "Specialty" ? "#b71c1c" : post.category === "Vegetarian" ? "#2e7d32" : "#e65100",
                    },
                    image: {
                        "xlink:href": post.image,
                    },
                },
                data: post,
            })
        })

        // Calculate similarities and create edges
        for (let i = 0; i < blogPosts.length; i++) {
            for (let j = i + 1; j < blogPosts.length; j++) {
                const similarity = calculateSimilarity(blogPosts[i], blogPosts[j])

                if (similarity >= similarityThreshold) {
                    graph.addEdge({
                        source: blogPosts[i].id.toString(),
                        target: blogPosts[j].id.toString(),
                        attrs: {
                            line: {
                                stroke: "#999",
                                strokeWidth: Math.max(1, similarity * 3),
                                strokeDasharray: similarity > 0.5 ? "none" : "5 5",
                            },
                        },
                        labels: [
                            {
                                attrs: {
                                    text: {
                                        text: `${(similarity * 100).toFixed(0)}%`,
                                        fill: "#666",
                                        fontSize: 10,
                                    },
                                },
                                position: {
                                    distance: 0.5,
                                },
                            },
                        ],
                        zIndex: -1,
                        data: { similarity },
                    })
                }
            }
        }

        // Layout the graph
        const nodeCount = nodes.length
        const radius = Math.max(300, nodeCount * 30)
        const angleStep = (2 * Math.PI) / nodeCount

        nodes.forEach((node, index) => {
            const angle = index * angleStep
            const x = radius * Math.cos(angle) + 400
            const y = radius * Math.sin(angle) + 300
            node.position(x, y)
        })

        // Center the content
        graph.centerContent()

        // Add central node for the main topic
        const centerNode = graph.addNode({
            shape: "circle",
            x: 400,
            y: 300,
            width: 100,
            height: 100,
            attrs: {
                body: {
                    fill: "#b71c1c",
                    stroke: "#7f0000",
                    strokeWidth: 2,
                },
                label: {
                    text: "Pizza Blog",
                    fill: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                },
            },
            zIndex: 1,
        })

        // Connect central node to all other nodes
        nodes.forEach((node) => {
            graph.addEdge({
                source: centerNode.id,
                target: node.id,
                attrs: {
                    line: {
                        stroke: "#b71c1c",
                        strokeWidth: 1,
                        targetMarker: {
                            name: "circle",
                            size: 3,
                        },
                    },
                },
                zIndex: -2,
            })
        })
    }, [similarityThreshold, isInitialized])

    return <div ref={containerRef} className="w-full h-full" />
}

