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

// Pizza mapping data
export const pizzaMap: Record<string, { name: string; price: string }> = {
    hawaiian_m: { name: "The Hawaiian Pizza", price: "13.25" },
    hawaiian_l: { name: "The Hawaiian Pizza", price: "16.5" },
    hawaiian_s: { name: "The Hawaiian Pizza", price: "10.5" },
    classic_dlx_s: { name: "The Classic Deluxe Pizza", price: "12" },
    classic_dlx_l: { name: "The Classic Deluxe Pizza", price: "20.5" },
    classic_dlx_m: { name: "The Classic Deluxe Pizza", price: "16" },
    five_cheese_l: { name: "The Five Cheese Pizza", price: "18.5" },
    ital_supr_s: { name: "The Italian Supreme Pizza", price: "12.5" },
    ital_supr_m: { name: "The Italian Supreme Pizza", price: "16.5" },
    ital_supr_l: { name: "The Italian Supreme Pizza", price: "20.75" },
    mexicana_s: { name: "The Mexicana Pizza", price: "12" },
    mexicana_l: { name: "The Mexicana Pizza", price: "20.25" },
    mexicana_m: { name: "The Mexicana Pizza", price: "16" },
    thai_ckn_s: { name: "The Thai Chicken Pizza", price: "12.75" },
    thai_ckn_m: { name: "The Thai Chicken Pizza", price: "16.75" },
    thai_ckn_l: { name: "The Thai Chicken Pizza", price: "20.75" },
    prsc_argla_s: { name: "The Prosciutto and Arugula Pizza", price: "12.5" },
    prsc_argla_m: { name: "The Prosciutto and Arugula Pizza", price: "16.5" },
    prsc_argla_l: { name: "The Prosciutto and Arugula Pizza", price: "20.75" },
    bbq_ckn_m: { name: "The Barbecue Chicken Pizza", price: "16.75" },
    bbq_ckn_l: { name: "The Barbecue Chicken Pizza", price: "20.75" },
    bbq_ckn_s: { name: "The Barbecue Chicken Pizza", price: "12.75" },
    the_greek_xl: { name: "The Greek Pizza", price: "25.5" },
    the_greek_xxl: { name: "The Greek Pizza", price: "35.95" },
    the_greek_l: { name: "The Greek Pizza", price: "20.5" },
    the_greek_m: { name: "The Greek Pizza", price: "16" },
    the_greek_s: { name: "The Greek Pizza", price: "12" },
    spinach_supr_l: { name: "The Spinach Supreme Pizza", price: "20.75" },
    spinach_supr_m: { name: "The Spinach Supreme Pizza", price: "16.5" },
    spinach_supr_s: { name: "The Spinach Supreme Pizza", price: "12.5" },
    green_garden_m: { name: "The Green Garden Pizza", price: "16" },
    green_garden_l: { name: "The Green Garden Pizza", price: "20.25" },
    green_garden_s: { name: "The Green Garden Pizza", price: "12" },
    ital_cpcllo_s: { name: "The Italian Capocollo Pizza", price: "12" },
    ital_cpcllo_m: { name: "The Italian Capocollo Pizza", price: "16" },
    ital_cpcllo_l: { name: "The Italian Capocollo Pizza", price: "20.5" },
    spicy_ital_m: { name: "The Spicy Italian Pizza", price: "16.5" },
    spicy_ital_s: { name: "The Spicy Italian Pizza", price: "12.5" },
    spicy_ital_l: { name: "The Spicy Italian Pizza", price: "20.75" },
    spin_pesto_m: { name: "The Spinach Pesto Pizza", price: "16.5" },
    spin_pesto_s: { name: "The Spinach Pesto Pizza", price: "12.5" },
    spin_pesto_l: { name: "The Spinach Pesto Pizza", price: "20.75" },
    veggie_veg_s: { name: "The Vegetables + Vegetables Pizza", price: "12" },
    veggie_veg_m: { name: "The Vegetables + Vegetables Pizza", price: "16" },
    veggie_veg_l: { name: "The Vegetables + Vegetables Pizza", price: "20.25" },
    southw_ckn_m: { name: "The Southwest Chicken Pizza", price: "16.75" },
    southw_ckn_s: { name: "The Southwest Chicken Pizza", price: "12.75" },
    southw_ckn_l: { name: "The Southwest Chicken Pizza", price: "20.75" },
    cali_ckn_l: { name: "The California Chicken Pizza", price: "20.75" },
    cali_ckn_s: { name: "The California Chicken Pizza", price: "12.75" },
    cali_ckn_m: { name: "The California Chicken Pizza", price: "16.75" },
    pepperoni_s: { name: "The Pepperoni Pizza", price: "9.75" },
    pepperoni_m: { name: "The Pepperoni Pizza", price: "12.5" },
    pepperoni_l: { name: "The Pepperoni Pizza", price: "15.25" },
    ckn_pesto_l: { name: "The Chicken Pesto Pizza", price: "20.75" },
    ckn_pesto_s: { name: "The Chicken Pesto Pizza", price: "12.75" },
    ckn_pesto_m: { name: "The Chicken Pesto Pizza", price: "16.75" },
    big_meat_s: { name: "The Big Meat Pizza", price: "12" },
    soppressata_s: { name: "The Soppressata Pizza", price: "12.5" },
    soppressata_m: { name: "The Soppressata Pizza", price: "16.5" },
    soppressata_l: { name: "The Soppressata Pizza", price: "20.75" },
    four_cheese_l: { name: "The Four Cheese Pizza", price: "17.95" },
    four_cheese_m: { name: "The Four Cheese Pizza", price: "14.75" },
    napolitana_m: { name: "The Napolitana Pizza", price: "16" },
    napolitana_l: { name: "The Napolitana Pizza", price: "20.5" },
    napolitana_s: { name: "The Napolitana Pizza", price: "12" },
    calabrese_s: { name: "The Calabrese Pizza", price: "12.25" },
    calabrese_l: { name: "The Calabrese Pizza", price: "20.25" },
    calabrese_m: { name: "The Calabrese Pizza", price: "16.25" },
    ital_veggie_m: { name: "The Italian Vegetables Pizza", price: "16.75" },
    ital_veggie_l: { name: "The Italian Vegetables Pizza", price: "21" },
    ital_veggie_s: { name: "The Italian Vegetables Pizza", price: "12.75" },
    mediterraneo_l: { name: "The Mediterranean Pizza", price: "20.25" },
    mediterraneo_s: { name: "The Mediterranean Pizza", price: "12" },
    mediterraneo_m: { name: "The Mediterranean Pizza", price: "16" },
    peppr_salami_s: { name: "The Pepper Salami Pizza", price: "12.5" },
    peppr_salami_l: { name: "The Pepper Salami Pizza", price: "20.75" },
    peppr_salami_m: { name: "The Pepper Salami Pizza", price: "16.5" },
    spinach_fet_s: { name: "The Spinach and Feta Pizza", price: "12" },
    spinach_fet_m: { name: "The Spinach and Feta Pizza", price: "16" },
    spinach_fet_l: { name: "The Spinach and Feta Pizza", price: "20.25" },
    sicilian_s: { name: "The Sicilian Pizza", price: "12.25" },
    sicilian_m: { name: "The Sicilian Pizza", price: "16.25" },
    sicilian_l: { name: "The Sicilian Pizza", price: "20.25" },
    ckn_alfredo_m: { name: "The Chicken Alfredo Pizza", price: "16.75" },
    ckn_alfredo_l: { name: "The Chicken Alfredo Pizza", price: "20.75" },
    ckn_alfredo_s: { name: "The Chicken Alfredo Pizza", price: "12.75" },
    pep_msh_pep_m: { name: "The Pepperoni, Mushroom, and Peppers Pizza", price: "14.5" },
    pep_msh_pep_s: { name: "The Pepperoni, Mushroom, and Peppers Pizza", price: "11" },
    pep_msh_pep_l: { name: "The Pepperoni, Mushroom, and Peppers Pizza", price: "17.5" },
    brie_carre_s: { name: "The Brie Carre Pizza", price: "23.65" },
}

// Create a unique list of pizza names from the map
const uniquePizzaNames = Array.from(new Set(Object.values(pizzaMap).map((pizza) => pizza.name)))

// Create pizza data with descriptions and proper IDs
const pizzaData = uniquePizzaNames.map((name) => {
    const pizzaEntryKey = Object.keys(pizzaMap).find((key) => pizzaMap[key].name === name)

    const price = pizzaEntryKey ? pizzaMap[pizzaEntryKey].price : "N/A"
    const id = pizzaEntryKey ?? name.toLowerCase().replace(/\s+/g, "_")

    return {
        id,
        name,
        price,
        image: `https://pizzas.khoav4.com/${encodeURIComponent(name)}.png?height=300&width=300`,
        category: getCategoryFromName(name),
        tags: getTagsFromName(name),
    }
})

// Helper function to determine category from name
function getCategoryFromName(name: string): string {
    if (name.includes("Chicken")) return "Chicken"
    if (name.includes("Vegetable") || name.includes("Veggie") || name.includes("Garden")) return "Vegetarian"
    if (name.includes("Cheese")) return "Cheese"
    if (name.includes("Italian") || name.includes("Mediterranean") || name.includes("Greek")) return "Mediterranean"
    if (name.includes("Meat") || name.includes("Pepperoni") || name.includes("Salami")) return "Meat"
    return "Specialty"
}

// Helper function to generate tags from name
function getTagsFromName(name: string): string[] {
    const tags: string[] = []
    const nameLower = name.toLowerCase()

    if (nameLower.includes("chicken")) tags.push("chicken")
    if (nameLower.includes("cheese")) tags.push("cheese")
    if (nameLower.includes("vegetable") || nameLower.includes("veggie")) tags.push("vegetarian")
    if (nameLower.includes("spicy")) tags.push("spicy")
    if (nameLower.includes("supreme")) tags.push("supreme")
    if (nameLower.includes("italian")) tags.push("italian")
    if (nameLower.includes("pesto")) tags.push("pesto")
    if (nameLower.includes("bbq") || nameLower.includes("barbecue")) tags.push("bbq")

    // Add a popular tag to some pizzas
    if (["The Hawaiian Pizza", "The Pepperoni Pizza", "The BBQ Chicken Pizza", "The Five Cheese Pizza"].includes(name)) {
        tags.push("popular")
    }

    return tags
}

// Categories
const categories = ["All", "Chicken", "Vegetarian", "Cheese", "Mediterranean", "Meat", "Specialty"]

export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [filteredPizzas, setFilteredPizzas] = useState(pizzaData)
    const [isSearching, setIsSearching] = useState(false)
    const [suggestedPizzas, setSuggestedPizzas] = useState<string[]>([])

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
        let filtered = pizzaData

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
                    pizza.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((pizza) => pizza.category === selectedCategory)
        }

        setFilteredPizzas(filtered)
    }, [searchTerm, selectedCategory, suggestedPizzas, isSearching])

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
                                    type="search"
                                    placeholder="Search pizzas..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="pr-10 bg-white/80 backdrop-blur-sm border-kungfu-gold/30 focus-visible:ring-kungfu-red"
                                />
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
                                        : "border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10"
                                }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                {/* Pizza Grid */}
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
                                        <div className="aspect-square overflow-hidden relative group">
                                            <Image
                                                src={pizza.image || "/placeholder.svg"}
                                                alt={pizza.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <Badge className="bg-kungfu-red/80 backdrop-blur-sm text-white">{pizza.category}</Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-xl font-bold">{pizza.name}</CardTitle>
                                            <CardDescription className="line-clamp-2 h-10">{""}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
                                            <div className="text-sm">
                                                <span className="text-lg font-bold text-kungfu-red">${pizza.price}</span>
                                            </div>
                                            <Button size="sm" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Order
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
            </div>
        </div>
    )
}
