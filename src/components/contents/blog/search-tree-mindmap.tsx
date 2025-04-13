import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { blogPosts } from "@/data/blog-posts"

interface MindmapNode {
    id: number
    title: string
    category: string
    excerpt: string
    relevance: number
    x: number
    y: number
}

interface SearchTreeMindmapProps {
    searchTerm: string
}

export function SearchTreeMindmap({ searchTerm }: SearchTreeMindmapProps) {
    const router = useRouter()
    const svgRef = useRef<SVGSVGElement>(null)
    const [nodes, setNodes] = useState<MindmapNode[]>([])
    const [hoveredNode, setHoveredNode] = useState<MindmapNode | null>(null)
    const [dimensions, setDimensions] = useState({ width: 1000, height: 600 })

    // Calculate relevance score between search term and blog post
    const calculateRelevance = (post: (typeof blogPosts)[0], term: string) => {
        const searchLower = term.toLowerCase()
        let score = 0

        // Check title
        if (post.title.toLowerCase().includes(searchLower)) {
            score += 0.5
        }

        // Check excerpt
        if (post.excerpt.toLowerCase().includes(searchLower)) {
            score += 0.3
        }

        // Check category
        if (post.category.toLowerCase().includes(searchLower)) {
            score += 0.2
        }

        // Check tags
        const matchingTags = post.tags.filter((tag) => tag.toLowerCase().includes(searchLower))
        score += matchingTags.length * 0.15

        // If no direct matches, give a small base score
        if (score === 0) {
            score = 0.05
        }

        return Math.min(score, 1)
    }

    // Build the tree structure based on search term
    useEffect(() => {
        if (!searchTerm.trim()) return

        // Calculate relevance for each post
        const postsWithRelevance = blogPosts.map((post) => ({
            ...post,
            relevance: calculateRelevance(post, searchTerm),
        }))

        // Sort by relevance (highest first)
        postsWithRelevance.sort((a, b) => b.relevance - a.relevance)

        // Create root node (search term)
        const rootNode: MindmapNode = {
            id: -1,
            title: searchTerm,
            category: "Search",
            excerpt: `Search results for "${searchTerm}"`,
            relevance: 1,
            x: 120, // Left side of the screen
            y: dimensions.height / 2, // Center vertically
        }

        // Create nodes for blog posts
        const blogNodes: MindmapNode[] = postsWithRelevance.map((post, index) => ({
            id: post.id,
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            relevance: post.relevance,
            x: 0, // Will be calculated
            y: 0, // Will be calculated
        }))

        // Calculate positions - HORIZONTAL LAYOUT
        const startX = 250 // Start position after root node
        const centerY = dimensions.height / 2
        const nodeSpacing = 180 // Horizontal spacing between nodes
        const verticalSpread = dimensions.height * 0.7 // How much to spread vertically

        // Group posts by relevance tiers for better organization
        const tiers: MindmapNode[][] = [[], [], []] // High, Medium, Low relevance

        blogNodes.forEach((node) => {
            if (node.relevance >= 0.7) {
                tiers[0].push(node) // High relevance
            } else if (node.relevance >= 0.4) {
                tiers[1].push(node) // Medium relevance
            } else {
                tiers[2].push(node) // Low relevance
            }
        })

        // Position nodes by tiers
        let currentX = startX

        tiers.forEach((tier, tierIndex) => {
            if (tier.length === 0) return

            // Calculate vertical distribution for this tier
            const tierHeight = Math.min(tier.length * 80, verticalSpread)
            const tierYStart = centerY - tierHeight / 2
            const tierYStep = tier.length > 1 ? tierHeight / (tier.length - 1) : 0

            tier.forEach((node, nodeIndex) => {
                node.x = currentX

                // Distribute nodes vertically within their tier
                if (tier.length === 1) {
                    node.y = centerY // Single node centered
                } else {
                    node.y = tierYStart + nodeIndex * tierYStep
                }
            })

            // Move to next tier's x position
            currentX += nodeSpacing
        })

        // Combine all nodes
        setNodes([rootNode, ...blogNodes])
    }, [searchTerm, dimensions])

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (svgRef.current) {
                const { width, height } = svgRef.current.getBoundingClientRect()
                setDimensions({ width, height })
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)
        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    // Handle node click
    const handleNodeClick = (node: MindmapNode) => {
        if (node.id > 0) {
            // Only navigate for actual blog posts
            router.push(`/blog/${node.id}`)
        }
    }

    // Get color based on category
    const getCategoryColor = (category: string) => {
        switch (category) {
            case "Specialty":
                return "#b71c1c"
            case "Vegetarian":
                return "#2e7d32"
            case "Classic":
                return "#e65100"
            case "Tutorial":
                return "#1565c0"
            case "Search":
                return "#6a1b9a"
            default:
                return "#616161"
        }
    }

    // Get node size based on relevance
    const getNodeSize = (relevance: number, isRoot: boolean) => {
        if (isRoot) return 60
        return 30 + relevance * 20
    }

    // Get line thickness based on relevance
    const getLineThickness = (relevance: number) => {
        return 1 + relevance * 3
    }

    if (nodes.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Enter a search term to see related blog posts</p>
            </div>
        )
    }

    return (
        <div className="w-full h-full overflow-auto">
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                className="mindmap-svg"
            >
                {/* Background gradient for visual appeal */}
                <defs>
                    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f3e5f5" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#e8f5e9" stopOpacity="0.3" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="url(#bg-gradient)" />

                {/* Draw connections from root to each blog node */}
                {nodes.length > 0 &&
                    nodes
                        .slice(1)
                        .map((node) => (
                            <motion.path
                                key={`line-${node.id}`}
                                d={`M ${nodes[0].x},${nodes[0].y} C ${(nodes[0].x + node.x) / 2},${nodes[0].y} ${(nodes[0].x + node.x) / 2},${node.y} ${node.x},${node.y}`}
                                stroke={getCategoryColor(node.category)}
                                strokeWidth={getLineThickness(node.relevance)}
                                strokeOpacity={0.6}
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            />
                        ))}

                {/* Draw nodes */}
                {nodes.map((node, index) => {
                    const isRoot = index === 0
                    const nodeSize = getNodeSize(node.relevance, isRoot)
                    const isHovered = hoveredNode?.id === node.id

                    return (
                        <g
                            key={`node-${node.id}`}
                            onClick={() => handleNodeClick(node)}
                            onMouseEnter={() => setHoveredNode(node)}
                            onMouseLeave={() => setHoveredNode(null)}
                            style={{ cursor: node.id > 0 ? "pointer" : "default" }}
                        >
                            {/* Node shadow for depth effect */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeSize + 2}
                                fill={getCategoryColor(isRoot ? "Search" : node.category)}
                                opacity={0.3}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            />

                            {/* Main node circle */}
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={nodeSize}
                                fill={getCategoryColor(isRoot ? "Search" : node.category)}
                                fillOpacity={isHovered ? 1 : 0.8}
                                stroke="#fff"
                                strokeWidth={2}
                                filter={isHovered ? "url(#glow)" : ""}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            />

                            {/* Node title */}
                            <motion.text
                                x={node.x}
                                y={node.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#fff"
                                fontSize={isRoot ? 16 : 12}
                                fontWeight="bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                            >
                                {isRoot ? node.title : node.title.length > 15 ? node.title.substring(0, 15) + "..." : node.title}
                            </motion.text>

                            {/* Relevance percentage for blog nodes */}
                            {!isRoot && (
                                <motion.text
                                    x={node.x}
                                    y={node.y + nodeSize + 15}
                                    textAnchor="middle"
                                    fill="#666"
                                    fontSize={10}
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                >
                                    {`${Math.round(node.relevance * 100)}%`}
                                </motion.text>
                            )}

                            {/* Category label for blog nodes */}
                            {!isRoot && (
                                <motion.text
                                    x={node.x}
                                    y={node.y - nodeSize - 8}
                                    textAnchor="middle"
                                    fill={getCategoryColor(node.category)}
                                    fontSize={9}
                                    fontWeight="bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                >
                                    {node.category}
                                </motion.text>
                            )}
                        </g>
                    )
                })}

                {/* Tooltip for hovered node */}
                {hoveredNode && (
                    <foreignObject
                        x={hoveredNode.x + getNodeSize(hoveredNode.relevance, hoveredNode.id === -1) + 10}
                        y={hoveredNode.y - 60}
                        width={250}
                        height={120}
                    >
                        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg text-sm border backdrop-blur-sm">
                            <p className="font-bold text-kungfu-red">{hoveredNode.title}</p>
                            {hoveredNode.id > 0 && (
                                <>
                                    <p className="text-muted-foreground text-xs">Category: {hoveredNode.category}</p>
                                    <p className="text-muted-foreground text-xs line-clamp-2 mt-1">{hoveredNode.excerpt}</p>
                                    <p className="text-primary text-xs mt-2 font-medium">Click to view post</p>
                                </>
                            )}
                        </div>
                    </foreignObject>
                )}
            </svg>
        </div>
    )
}
