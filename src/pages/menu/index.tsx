
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image";

const pizzas = [
    {
        id: "1",
        name: "Dragon's Breath",
        description:
            "Spicy pepperoni, jalapeños, and dragon fruit on our signature crust, finished with a fiery sauce that brings the heat of a dragon's breath.",
        price: 18.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Specialty",
        tags: ["spicy", "meat", "signature"],
    },
    {
        id: "2",
        name: "Tai Chi Supreme",
        description:
            "A balanced harmony of vegetables and cheeses, representing the yin and yang of flavors. Perfect for those seeking balance in their meal.",
        price: 16.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Vegetarian",
        tags: ["vegetarian", "cheese", "balanced"],
    },
    {
        id: "3",
        name: "Wudang Master",
        description:
            "Our signature pizza with five secret ingredients, passed down through generations of pizza masters. A true taste of tradition.",
        price: 21.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Signature",
        tags: ["signature", "premium", "traditional"],
    },
    {
        id: "4",
        name: "Shaolin Veggie",
        description:
            "A meditative blend of fresh vegetables, mushrooms, and herbs on a thin, crispy crust. Enlightenment in every bite.",
        price: 15.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Vegetarian",
        tags: ["vegetarian", "healthy", "light"],
    },
    {
        id: "5",
        name: "Kung Fu Chicken",
        description:
            "Grilled chicken, bell peppers, and onions with our special kung fu sauce. A powerful combination of flavors.",
        price: 17.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Meat",
        tags: ["chicken", "savory", "popular"],
    },
    {
        id: "6",
        name: "Monk's Meditation",
        description:
            "A simple yet profound combination of fresh tomatoes, basil, and mozzarella on our handcrafted crust. Simplicity is the ultimate sophistication.",
        price: 14.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Classic",
        tags: ["classic", "simple", "vegetarian"],
    },
    {
        id: "7",
        name: "Five Elements",
        description:
            "Five distinct sections representing water, fire, earth, metal, and wood, each with unique toppings and flavors.",
        price: 23.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Specialty",
        tags: ["specialty", "premium", "unique"],
    },
    {
        id: "8",
        name: "Warrior's Feast",
        description: "Loaded with pepperoni, sausage, ham, bacon, and beef. A protein-packed pizza for the true warrior.",
        price: 22.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Meat",
        tags: ["meat", "protein", "hearty"],
    },
]


export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory] = useState("All")
    const [filteredPizzas, setFilteredPizzas] = useState(pizzas)

    useEffect(() => {
        let filtered = pizzas

        if (searchTerm) {
            filtered = filtered.filter(
                (pizza) =>
                    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pizza.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pizza.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
            )
        }

        if (selectedCategory !== "All") {
            filtered = filtered.filter((pizza) => pizza.category === selectedCategory)
        }

        setFilteredPizzas(filtered)
    }, [searchTerm, selectedCategory])

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
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
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search pizzas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </motion.div>

                    {/* Category Filters */}
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
                                    <Card className="h-full flex flex-col overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                        <div className="aspect-square overflow-hidden relative group">
                                            <Image
                                                src={pizza.image || "https://i.imgur.com/ts6tQmj.jpeg"}
                                                alt={pizza.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <Badge className="bg-primary/80 backdrop-blur-sm">{pizza.category}</Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-xl font-bold">{pizza.name}</CardTitle>
                                            <CardDescription className="line-clamp-2 h-10">{pizza.description}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
                                            <span className="text-lg font-bold text-primary">${pizza.price.toFixed(2)}</span>
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white btn-hover">
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
                            <p className="text-lg text-muted-foreground">No pizzas found. Try a different search term or category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

