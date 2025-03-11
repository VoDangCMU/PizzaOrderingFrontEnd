"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ShoppingCart, ChevronLeft, Plus, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link";
import Image from "next/image";

interface Pizza {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    tags: string[];
    ingredients: string[];
}

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
        ingredients: ["Pepperoni", "Jalapeños", "Dragon Fruit", "Mozzarella", "Spicy Sauce"],
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
        ingredients: ["Bell Peppers", "Mushrooms", "Onions", "Olives", "Mozzarella", "Feta"],
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
        ingredients: [
            "Secret Ingredient 1",
            "Secret Ingredient 2",
            "Secret Ingredient 3",
            "Secret Ingredient 4",
            "Secret Ingredient 5",
        ],
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
        ingredients: ["Spinach", "Mushrooms", "Tomatoes", "Basil", "Mozzarella"],
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
        ingredients: ["Grilled Chicken", "Bell Peppers", "Onions", "Kung Fu Sauce", "Mozzarella"],
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
        ingredients: ["Fresh Tomatoes", "Basil", "Mozzarella", "Olive Oil"],
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
        ingredients: [
            "Seafood (Water)",
            "Spicy Peppers (Fire)",
            "Vegetables (Earth)",
            "Truffle Oil (Metal)",
            "Herbs (Wood)",
        ],
    },
    {
        id: "8",
        name: "Warrior's Feast",
        description: "Loaded with pepperoni, sausage, ham, bacon, and beef. A protein-packed pizza for the true warrior.",
        price: 22.99,
        image: "https://i.imgur.com/ts6tQmj.jpeg?height=300&width=300",
        category: "Meat",
        tags: ["meat", "protein", "hearty"],
        ingredients: ["Pepperoni", "Sausage", "Ham", "Bacon", "Ground Beef", "Mozzarella"],
    },
]

const sizes = [
    { id: "small", name: 'Small (10")', priceMultiplier: 0.8 },
    { id: "medium", name: 'Medium (12")', priceMultiplier: 1 },
    { id: "large", name: 'Large (14")', priceMultiplier: 1.2 },
    { id: "xl", name: 'Extra Large (16")', priceMultiplier: 1.4 },
]

const extraToppings = [
    { id: "extra-cheese", name: "Extra Cheese", price: 1.5 },
    { id: "pepperoni", name: "Pepperoni", price: 1.5 },
    { id: "mushrooms", name: "Mushrooms", price: 1 },
    { id: "onions", name: "Onions", price: 0.75 },
    { id: "bell-peppers", name: "Bell Peppers", price: 0.75 },
    { id: "olives", name: "Olives", price: 1 },
    { id: "pineapple", name: "Pineapple", price: 1 },
    { id: "ham", name: "Ham", price: 1.5 },
    { id: "bacon", name: "Bacon", price: 1.5 },
    { id: "chicken", name: "Grilled Chicken", price: 2 },
]

export default function PizzaDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addToCart } = useCart()

    const [pizza, setPizza] = useState<Pizza | null>(null);
    const [loading, setLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState("medium")
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const fetchPizza = async () => {
            setLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 500))

                const foundPizza = pizzas.find((p) => p.id === params.id)
                if (foundPizza) {
                    setPizza(foundPizza)
                    // Initialize total price
                    const sizeMultiplier = sizes.find((s) => s.id === selectedSize)?.priceMultiplier || 1
                    setTotalPrice(foundPizza.price * sizeMultiplier)
                } else {
                    // Pizza not found, redirect to menu
                    router.push("/menu")
                }
            } catch (error) {
                console.error("Error fetching pizza:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPizza()
    }, [params.id, router, selectedSize])

    // Update total price when selections change
    useEffect(() => {
        if (pizza) {
            const sizeMultiplier = sizes.find((s) => s.id === selectedSize)?.priceMultiplier || 1
            const toppingsTotal = selectedToppings.reduce((sum, toppingId) => {
                const topping = extraToppings.find((t) => t.id === toppingId)
                return sum + (topping?.price || 0)
            }, 0)

            setTotalPrice((pizza.price * sizeMultiplier + toppingsTotal) * quantity)
        }
    }, [pizza, selectedSize, selectedToppings, quantity])

    // Handle size change
    const handleSizeChange = (value: string) => {
        setSelectedSize(value)
    }

    // Handle topping toggle
    const handleToppingToggle = (toppingId: string) => {
        setSelectedToppings((prev) => {
            if (prev.includes(toppingId)) {
                return prev.filter((id) => id !== toppingId)
            } else {
                return [...prev, toppingId]
            }
        })
    }

    // Handle quantity change
    const handleQuantityChange = (change: number) => {
        setQuantity((prev) => Math.max(1, prev + change))
    }

    // Handle add to cart
    const handleAddToCart = () => {
        if (pizza) {
            const selectedSizeObj = sizes.find((s) => s.id === selectedSize)
            const selectedToppingsArray = selectedToppings
                .map((id) => {
                    const topping = extraToppings.find((t) => t.id === id)
                    return topping?.name || ""
                })
                .filter(Boolean)

            addToCart({
                id: pizza.id,
                name: pizza.name,
                price: totalPrice / quantity,
                quantity,
                image: pizza.image,
                size: selectedSizeObj?.name || "Medium",
                toppings: selectedToppingsArray,
            })

            toast({
                title: "Added to cart",
                description: `${quantity} x ${pizza.name} (${selectedSizeObj?.name || "Medium"})`,
            })
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading pizza details...</p>
                </div>
            </div>
        )
    }

    if (!pizza) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Pizza not found</p>
                    <Button asChild className="mt-4">
                        <Link href="../menu">Back to Menu</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/menu")}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Menu
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pizza Image */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <Card className="overflow-hidden">
                            <div className="aspect-square relative">
                                <Image src={pizza.image || "https://i.imgur.com/ts6tQmj.jpeg"} alt={pizza.name} className="w-full h-full object-cover" />
                                <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm">{pizza.category}</Badge>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Pizza Details and Order Form */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gradient">{pizza.name}</h1>
                                <p className="text-xl font-bold text-primary mt-2">${pizza.price.toFixed(2)}</p>
                                <p className="text-foreground/80 mt-4">{pizza.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                                <div className="flex flex-wrap gap-2">
                                    {pizza.ingredients.map((ingredient: string) => (
                                        <Badge key={ingredient} variant="secondary">
                                            {ingredient}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Tabs defaultValue="customize" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="customize">Customize</TabsTrigger>
                                    <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                                </TabsList>

                                <TabsContent value="customize" className="space-y-6 pt-4">
                                    {/* Size Selection */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Choose Size</h3>
                                        <RadioGroup
                                            value={selectedSize}
                                            onValueChange={handleSizeChange}
                                            className="grid grid-cols-2 gap-3"
                                        >
                                            {sizes.map((size) => (
                                                <div key={size.id} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={size.id} id={size.id} />
                                                    <Label htmlFor={size.id} className="flex justify-between w-full">
                                                        <span>{size.name}</span>
                                                        <span className="text-muted-foreground">
                              ${(pizza.price * size.priceMultiplier).toFixed(2)}
                            </span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    {/* Extra Toppings */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Extra Toppings</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {extraToppings.map((topping) => (
                                                <div key={topping.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={topping.id}
                                                        checked={selectedToppings.includes(topping.id)}
                                                        onCheckedChange={() => handleToppingToggle(topping.id)}
                                                    />
                                                    <Label htmlFor={topping.id} className="flex justify-between w-full">
                                                        <span>{topping.name}</span>
                                                        <span className="text-muted-foreground">+${topping.price.toFixed(2)}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Quantity</h3>
                                        <div className="flex items-center space-x-3">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(-1)}
                                                disabled={quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                                            <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="nutrition" className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between py-2 border-b">
                                            <span>Calories</span>
                                            <span>250-350 per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span>Protein</span>
                                            <span>12-15g per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span>Carbohydrates</span>
                                            <span>30-35g per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b">
                                            <span>Fat</span>
                                            <span>10-15g per slice</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Nutritional values are approximate and may vary based on size and toppings.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Total and Add to Cart */}
                            <div className="pt-4 border-t">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium">Total:</span>
                                    <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                                <Button
                                    className="w-full bg-primary hover:bg-primary/90 text-white btn-hover"
                                    size="lg"
                                    onClick={handleAddToCart}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

