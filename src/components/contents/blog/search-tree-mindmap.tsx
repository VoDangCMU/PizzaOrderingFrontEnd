"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    children: MindmapNode[]
    parent?: MindmapNode
    depth: number
    position: "top" | "bottom" | "root"
}

interface SearchTreeMindmapProps {
    searchTerm: string
}

export function SearchTreeMindmap({ searchTerm }: SearchTreeMindmapProps) {
    const router = useRouter()
    const svgRef = useRef<SVGSVGElement>(null)
    const [nodes, setNodes] = useState<MindmapNode[]>([])
    const [connections, setConnections] = useState<{ from: MindmapNode; to: MindmapNode }[]>([])
    const [hoveredNode, setHoveredNode] = useState<MindmapNode | null>(null)
    const [dimensions, setDimensions] = useState({ width: 1000, height: 600 })
    const [isSearching, setIsSearching] = useState(false)
    const [rootNode, setRootNode] = useState<MindmapNode | null>(null)
    const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(null)

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

    // Build binary tree structure
    const buildBinaryTree = (posts: (typeof blogPosts & { relevance: number })[], maxDepth = 4) => {
        if (posts.length === 0) return null

        // Create root node
        const root: MindmapNode = {
            id: -1,
            title: searchTerm,
            category: "Search",
            excerpt: `Search results for "${searchTerm}"`,
            relevance: 1,
            x: 120, // Left position for horizontal layout
            y: dimensions.height / 2, // Center vertically
            children: [],
            depth: 0,
            position: "root",
        }

        // Sort posts by relevance
        const sortedPosts = [...posts].sort((a, b) => b.relevance - a.relevance)

        // Function to recursively build the tree
        const buildSubtree = (
            parentNode: MindmapNode,
            availablePosts: (typeof blogPosts & { relevance: number })[],
            depth: number,
            position: "top" | "bottom",
        ) => {
            if (depth >= maxDepth || availablePosts.length === 0) return

            // Take the post with highest relevance
            const post = availablePosts[0]
            const remainingPosts = availablePosts.slice(1)

            // Create node for this post
            const node: MindmapNode = {
                id: post.id,
                title: post.title,
                category: post.category,
                excerpt: post.excerpt,
                relevance: post.relevance,
                x: 0, // Will be calculated later
                y: 0, // Will be calculated later
                children: [],
                parent: parentNode,
                depth: depth,
                position: position,
            }

            // Add this node as a child to parent
            parentNode.children.push(node)

            // Recursively build top and bottom subtrees
            if (remainingPosts.length > 0) {
                buildSubtree(node, remainingPosts.slice(0, Math.ceil(remainingPosts.length / 2)), depth + 1, "top")
            }

            if (remainingPosts.length > 1) {
                buildSubtree(node, remainingPosts.slice(Math.ceil(remainingPosts.length / 2)), depth + 1, "bottom")
            }
        }

        // Build top and bottom subtrees from root
        if (sortedPosts.length > 0) {
            buildSubtree(root, sortedPosts.slice(0, Math.ceil(sortedPosts.length / 2)), 1, "top")
        }

        if (sortedPosts.length > 1) {
            buildSubtree(root, sortedPosts.slice(Math.ceil(sortedPosts.length / 2)), 1, "bottom")
        }

        return root
    }

    // Calculate positions for all nodes in the tree - HORIZONTAL LAYOUT with EVEN SPACING
    const calculatePositions = (root: MindmapNode | null) => {
        if (!root) return []

        // Improved spacing for better visualization
        const horizontalSpacing = 220 // Space between depth levels (horizontal)
        const verticalSpacingBase = 150 // Base vertical spacing
        const allNodes: MindmapNode[] = []
        const allConnections: { from: MindmapNode; to: MindmapNode }[] = []

        // Set root position
        root.x = 120 // Left position
        root.y = dimensions.height / 2 // Center vertically
        allNodes.push(root)

        // Function to count total nodes in a subtree
        const countSubtreeNodes = (node: MindmapNode): number => {
            if (node.children.length === 0) return 1
            return 1 + node.children.reduce((sum, child) => sum + countSubtreeNodes(child), 0)
        }

        // Function to recursively calculate positions with even spacing
        const calculateSubtreePositions = (node: MindmapNode, availableHeight: number, startY: number) => {
            const topChildren = node.children.filter((child) => child.position === "top")
            const bottomChildren = node.children.filter((child) => child.position === "bottom")

            // Calculate total nodes in each subtree to determine space allocation
            const topNodesCount = topChildren.reduce((sum, child) => sum + countSubtreeNodes(child), 0)
            const bottomNodesCount = bottomChildren.reduce((sum, child) => sum + countSubtreeNodes(child), 0)
            const totalNodesCount = topNodesCount + bottomNodesCount

            // Adjust vertical spacing based on depth to create a more balanced tree
            const verticalSpacing = Math.max(verticalSpacingBase - node.depth * 20, 80)

            // Calculate positions for top children
            if (topChildren.length > 0) {
                const topHeight = (availableHeight * topNodesCount) / totalNodesCount
                let topStartY = startY

                topChildren.forEach((child, index) => {
                    // Calculate subtree node count for this child
                    const childNodesCount = countSubtreeNodes(child)
                    const childHeight = (topHeight * childNodesCount) / topNodesCount

                    // Position this child
                    child.x = node.x + horizontalSpacing
                    child.y = topStartY + childHeight / 2 + (index * verticalSpacing) / 2

                    // Ensure minimum spacing between nodes
                    if (index > 0) {
                        const prevChild = topChildren[index - 1]
                        const minY = prevChild.y + verticalSpacing
                        if (child.y < minY) child.y = minY
                    }

                    allNodes.push(child)
                    allConnections.push({ from: node, to: child })

                    // Recursively position this child's subtree
                    calculateSubtreePositions(child, childHeight, topStartY)

                    // Update start Y for next child
                    topStartY += childHeight
                })
            }

            // Calculate positions for bottom children
            if (bottomChildren.length > 0) {
                const bottomHeight = (availableHeight * bottomNodesCount) / totalNodesCount
                let bottomStartY = startY + (availableHeight * topNodesCount) / totalNodesCount

                bottomChildren.forEach((child, index) => {
                    // Calculate subtree node count for this child
                    const childNodesCount = countSubtreeNodes(child)
                    const childHeight = (bottomHeight * childNodesCount) / bottomNodesCount

                    // Position this child
                    child.x = node.x + horizontalSpacing
                    child.y = bottomStartY + childHeight / 2 + (index * verticalSpacing) / 2

                    // Ensure minimum spacing between nodes
                    if (index > 0) {
                        const prevChild = bottomChildren[index - 1]
                        const minY = prevChild.y + verticalSpacing
                        if (child.y < minY) child.y = minY
                    }

                    allNodes.push(child)
                    allConnections.push({ from: node, to: child })

                    // Recursively position this child's subtree
                    calculateSubtreePositions(child, childHeight, bottomStartY)

                    // Update start Y for next child
                    bottomStartY += childHeight
                })
            }
        }

        calculateSubtreePositions(root, dimensions.height, 0)

        // Final adjustment to ensure all nodes are within the visible area
        const minY = Math.min(...allNodes.map((node) => node.y))
        const maxY = Math.max(...allNodes.map((node) => node.y))
        const verticalPadding = 50

        if (minY < verticalPadding || maxY > dimensions.height - verticalPadding) {
            const currentRange = maxY - minY
            const targetRange = dimensions.height - 2 * verticalPadding
            const scale = targetRange / currentRange

            allNodes.forEach((node) => {
                if (node !== root) {
                    // Adjust Y position to fit within visible area
                    node.y = verticalPadding + (node.y - minY) * scale
                }
            })
        }

        return { nodes: allNodes, connections: allConnections }
    }

    // Build the tree structure based on search term
    useEffect(() => {
        if (!searchTerm.trim()) return

        setIsSearching(true)

        // Small delay to allow for animation
        setTimeout(() => {
            // Calculate relevance for each post
            const postsWithRelevance = blogPosts.map((post) => ({
                ...post,
                relevance: calculateRelevance(post, searchTerm),
            }))

            // Build binary tree
            const root = buildBinaryTree(postsWithRelevance)
            setRootNode(root)

            if (root) {
                // Calculate positions
                const { nodes, connections } = calculatePositions(root)
                setNodes(nodes)
                setConnections(connections)
            } else {
                setNodes([])
                setConnections([])
            }

            setIsSearching(false)
        }, 500)
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
        setSelectedNode(node)

        // Add a small delay before navigation for animation effect
        if (node.id > 0) {
            setTimeout(() => {
                router.push(`/blog/${node.id}`)
            }, 300)
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

    // Get node dimensions based on relevance and depth
    const getNodeDimensions = (node: MindmapNode) => {
        if (node.position === "root") {
            return { width: 160, height: 70 }
        }

        // Decrease size as we go deeper
        const baseWidth = 160 - node.depth * 5
        const width = Math.max(130, baseWidth)
        const height = 60

        return { width, height }
    }

    // Get relevance label
    const getRelevanceLabel = (relevance: number) => {
        if (relevance >= 0.7) return "High"
        if (relevance >= 0.4) return "Medium"
        return "Low"
    }

    if (isSearching) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin mr-3"></div>
                <p className="text-lg font-medium text-kungfu-red">Tìm kiếm bài viết...</p>
            </div>
        )
    }

    if (nodes.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-muted-foreground">Nhập từ khóa tìm kiếm để xem các bài viết liên quan</p>
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
                {/* Background */}
                <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="#f8f9fa" />

                {/* Draw connections */}
                <AnimatePresence>
                    {connections.map((connection, index) => {
                        const from = connection.from
                        const to = connection.to
                        const fromDimensions = getNodeDimensions(from)
                        const toDimensions = getNodeDimensions(to)

                        // Create a path between nodes
                        const startX = from.x + fromDimensions.width / 2
                        const startY = from.y
                        const endX = to.x - toDimensions.width / 2
                        const endY = to.y

                        // Add some curvature
                        const controlX = (startX + endX) / 2
                        const path = `M ${startX},${startY} C ${controlX},${startY} ${controlX},${endY} ${endX},${endY}`

                        return (
                            <motion.path
                                key={`connection-${from.id}-${to.id}`}
                                d={path}
                                stroke="#d1d5db"
                                strokeWidth={2}
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + index * 0.05,
                                }}
                            />
                        )
                    })}
                </AnimatePresence>

                {/* Draw nodes */}
                <AnimatePresence>
                    {nodes.map((node, index) => {
                        const { width, height } = getNodeDimensions(node)
                        const isHovered = hoveredNode?.id === node.id
                        const isRoot = node.position === "root"
                        const isSelected = selectedNode?.id === node.id
                        const categoryColor = getCategoryColor(node.category)

                        return (
                            <motion.g
                                key={`node-${node.id}`}
                                onClick={() => handleNodeClick(node)}
                                onMouseEnter={() => setHoveredNode(node)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{ cursor: node.id > 0 ? "pointer" : "default" }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                    delay: isRoot ? 0 : 0.1 + index * 0.05,
                                }}
                            >
                                {/* Node background */}
                                <motion.rect
                                    x={node.x - width / 2}
                                    y={node.y - height / 2}
                                    width={width}
                                    height={height}
                                    rx={6}
                                    ry={6}
                                    fill={isRoot ? "#f0f4ff" : "white"}
                                    stroke={isRoot ? "#818cf8" : categoryColor}
                                    strokeWidth={isHovered || isSelected ? 2 : 1}
                                    filter={isHovered || isSelected ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" : "none"}
                                    whileHover={{ scale: 1.05 }}
                                />

                                {/* Category indicator */}
                                <rect
                                    x={node.x - width / 2}
                                    y={node.y - height / 2}
                                    width={6}
                                    height={height}
                                    fill={categoryColor}
                                    rx={3}
                                    ry={3}
                                />

                                {/* Node title */}
                                <text
                                    x={node.x}
                                    y={node.y - 5}
                                    textAnchor="middle"
                                    fill="#1f2937"
                                    fontSize={isRoot ? 12 : 10}
                                    fontWeight="500"
                                    className="select-none"
                                >
                                    {node.title.length > 20 ? node.title.substring(0, 20) + "..." : node.title}
                                </text>

                                {/* Category and relevance info */}
                                <text
                                    x={node.x}
                                    y={node.y + 15}
                                    textAnchor="middle"
                                    fill="#6b7280"
                                    fontSize={10}
                                    className="select-none"
                                >
                                    {isRoot ? "Search Term" : `${node.category} • ${Math.round(node.relevance * 100)}%`}
                                </text>

                                {/* Click indicator for blog posts */}
                            </motion.g>
                        )
                    })}
                </AnimatePresence>

                {/* Tooltip for hovered node */}
                <AnimatePresence>
                    {hoveredNode && hoveredNode.id > 0 && (
                        <motion.foreignObject
                            x={hoveredNode.x + getNodeDimensions(hoveredNode).width / 2 + 10}
                            y={hoveredNode.y - 70}
                            width={280}
                            height={140}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="bg-white p-3 rounded-lg shadow-lg text-sm border border-gray-200">
                                <p className="font-bold text-gray-900">{hoveredNode.title}</p>
                                <div className="flex items-center mt-1">
                  <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getCategoryColor(hoveredNode.category) }}
                  ></span>
                                    <p className="text-gray-600 text-xs">{hoveredNode.category}</p>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <p className="text-gray-600 text-xs">
                                        {getRelevanceLabel(hoveredNode.relevance)} ({Math.round(hoveredNode.relevance * 100)}%)
                                    </p>
                                </div>
                                <p className="text-gray-600 text-xs line-clamp-2 mt-2">{hoveredNode.excerpt}</p>
                                <div className="mt-2 bg-gray-100 text-gray-800 py-1 px-2 rounded text-center text-xs font-medium">
                                    Click vào node để xem bài viết
                                </div>
                            </div>
                        </motion.foreignObject>
                    )}
                </AnimatePresence>
            </svg>
        </div>
    )
}
