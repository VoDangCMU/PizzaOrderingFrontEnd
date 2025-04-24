"use client"

import type React from "react"

import { useState, useEffect, type FormEvent } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import axios from "axios"

// Define interfaces for API response
interface PizzaSize {
    id: string
    size: string
    price: string
    image: string
    pizzaNameID: string
}

interface PizzaCategory {
    id: string
    name: string
    description: string
}

interface PizzaImage {
    id: string
    src: string
    alt: string
}

interface PizzaData {
    id: string
    name: string
    description: string
    unitPrice: string
    sizes: PizzaSize[]
    category: PizzaCategory
    images: PizzaImage[]
    extras?: string[]
    crusts?: string[]
}

interface ApiResponse {
    data: PizzaData[]
}

// Interface for our processed pizza data
interface Pizza {
    id: string
    name: string
    description: string
    price: string
    image: string
    category: string
    tags: string[]
}

// Categories
const categories = ["All", "Chicken", "Vegetarian", "Classic", "Supreme", "Veggie"]

// Helper function to determine tags from name and description
function getTagsFromPizza(pizza: PizzaData): string[] {
    const tags: string[] = []
    const nameLower = pizza.name.toLowerCase()
    const descLower = pizza.description?.toLowerCase() || ""

    if (nameLower.includes("chicken") || descLower.includes("chicken") || pizza.category.name === "Chicken") tags.push("chicken")
    if (nameLower.includes("cheese") || descLower.includes("cheese")) tags.push("cheese")
    if (nameLower.includes("vegetable") || nameLower.includes("veggie") || pizza.category.name === "Veggie") tags.push("vegetarian")
    if (nameLower.includes("spicy") || descLower.includes("spicy")) tags.push("spicy")
    if (nameLower.includes("supreme") || pizza.category.name === "Supreme") tags.push("supreme")
    if (nameLower.includes("italian") || descLower.includes("italian")) tags.push("italian")
    if (nameLower.includes("pesto") || descLower.includes("pesto")) tags.push("pesto")
    if (nameLower.includes("bbq") || nameLower.includes("barbecue") || descLower.includes("bbq")) tags.push("bbq")

    // Add a popular tag to some pizzas (could be based on other criteria)
    if (pizza.name.includes("Classic") || pizza.category.name === "Classic") {
        tags.push("popular")
    }

    return tags
}

export default function MenuPage() {
    const [pizzas, setPizzas] = useState<Pizza[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [suggestedPizzas, setSuggestedPizzas] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch pizza data from API
    useEffect(() => {
        const fetchPizzas = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get<ApiResponse>('/api/pizza/get-all')

                // Process the API response to format our pizza data
                const processedPizzas = response.data.data.map(pizza => {
                    return {
                        id: pizza.id,
                        name: pizza.name,
                        description: pizza.description || "",
                        // Use the price of the first size, or default to unitPrice
                        price: pizza.sizes[0]?.price || pizza.unitPrice,
                        // Use the first image if available, or a fallback
                        image: pizza.images[0]?.src || `https://pizzas.khoav4.com/${encodeURIComponent(pizza.name)}.png`,
                        category: pizza.category?.name || "Other",
                        tags: getTagsFromPizza(pizza)
                    }
                })

                setPizzas(processedPizzas)
                setFilteredPizzas(processedPizzas)
                setError(null)
            } catch (err) {
                console.error("Error fetching pizzas:", err)
                setError("Failed to load pizzas. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPizzas()
    }, [])

    // Handle search term change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    // Handle search submission
    const handleSearch = async (e?: FormEvent) => {
        if (e) {
            e.preventDefault()
        }

        if (!searchTerm.trim()) {
            setSuggestedPizzas([])
            return
        }

        setIsSearching(true)
        const ai_api = localStorage.getItem("ai_api")

        try {
            const response = await fetch(`${ai_api}/search_NLP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: searchTerm }),
            })

            if (!response.ok) {
                throw new Error("Network response was not ok")
            }

            const data = await response.json()
            setSuggestedPizzas(data.suggested_pizzas || [])
        } catch (error) {
            console.error("Error searching pizzas:", error)
            // Fallback to local search on error
            setSuggestedPizzas([])
        } finally {
            setIsSearching(false)
        }
    }

    // Filter pizzas based on search term, suggested pizzas, and category
    useEffect(() => {
        if (isLoading) return

        let filtered = pizzas

        // Filter by search term or suggested pizzas
        if (searchTerm && suggestedPizzas.length > 0) {
            // Use suggested pizzas from API
            filtered = filtered.filter((pizza) =>
                suggestedPizzas.some((suggestedName) => pizza.name.toLowerCase().includes(suggestedName.toLowerCase())),
            )
        } else if (searchTerm && !isSearching) {
            // Fallback to local search if API hasn't returned results yet
            filtered = filtered.filter(
                (pizza) =>
                    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pizza.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    pizza.description.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((pizza) => pizza.category === selectedCategory)
        }

        setFilteredPizzas(filtered)
    }, [searchTerm, selectedCategory, suggestedPizzas, isSearching, pizzas, isLoading])

    return (
        <div className="min-h-screen pt-24 pb-16 bg-kungfu-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-kungfu-red/5 to-kungfu-gold/5 z-0"></div>
            <div className="container px-4 relative z-10">
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 kungfu-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Menu
                    </motion.h1>
                    <motion.p
                        className="text-lg max-w-2xl mx-auto text-foreground/80 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Explore our selection of martial arts inspired pizzas, crafted with precision and passion.
                    </motion.p>

                    {/* Search and Filter */}
                    <motion.div
                        className="max-w-md mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Search by name, ingredients, or flavor..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pr-10 bg-white/80 backdrop-blur-sm border-kungfu-gold/30 focus-visible:ring-kungfu-red"
                                />
                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                            <Button type="submit" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white" disabled={isSearching}>
                                {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                            </Button>
                        </form>
                        {isSearching && <p className="text-sm text-muted-foreground mt-2">Searching for the perfect pizza...</p>}
                    </motion.div>

                    {/* Category Filters */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full ${
                                    selectedCategory === category
                                        ? "bg-kungfu-red hover:bg-kungfu-darkRed text-white"
                                        : "text-kungfu-red border-kungfu-red hover:bg-kungfu-red/10"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                {/* Loading state */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 border-4 border-kungfu-red/20 border-t-kungfu-red rounded-full animate-spin mb-4"></div>
                            <p className="text-kungfu-red font-medium">Loading our delicious menu...</p>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {error && !isLoading && (
                    <div className="text-center py-12">
                        <div className="bg-red-100/50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                            <span className="text-4xl">⚠️</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-red-600">{error}</h3>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                            className="mt-4 border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10"
                        >
                            Try again
                        </Button>
                    </div>
                )}

                {/* Pizza Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPizzas.length > 0 ? (
                            filteredPizzas.map((pizza, index) => (
                                <motion.div
                                    key={pizza.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                                    whileHover={{ y: -10 }}
                                >
                                    <Link href={`/menu/${pizza.id}`}>
                                        <Card className="h-full flex flex-col overflow-hidden kungfu-card border-kungfu-gold/30 shadow-lg hover:shadow-xl transition-all duration-300">
                                            <div className="relative h-72 overflow-hidden bg-gray-100"> {/* Increased height from h-64 to h-72 */}
                                                <Image
                                                    src={pizza.image}
                                                    alt={pizza.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover transition-all duration-500 hover:scale-110"
                                                    priority={index < 4}
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Badge className="bg-kungfu-red/80 backdrop-blur-sm text-white">{pizza.category}</Badge>
                                                </div>
                                            </div>
                                            <CardHeader className="py-4">
                                                <CardTitle className="text-lg font-bold kungfu-text">{pizza.name}</CardTitle>
                                                <CardDescription className="line-clamp-2 h-10 text-sm text-muted-foreground">
                                                    {pizza.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter className="py-4 pt-0 mt-auto flex justify-between items-center">
                                                <p className="text-lg font-bold text-kungfu-red">${pizza.price}</p>
                                                <Button size="sm" className="bg-kungfu-gold hover:bg-kungfu-gold/90 text-white">
                                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                                    Add to cart
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="bg-amber-100/50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <Search className="h-12 w-12 text-kungfu-red/70" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 kungfu-text">No pizzas found</h3>
                                <p className="text-lg text-muted-foreground">Try a different search term or category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
