import {useState, useEffect} from "react"
import {useParams, useRouter} from "next/navigation"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {ShoppingCart, ChevronLeft, Plus, Minus} from "lucide-react"
import {Badge} from "@/components/ui/badge"
// import {useCart} from "@/hooks/use-cart"
// import {toast} from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"

import axios from "axios";
import FeaturedPizzas from "@/components/contents/featured-pizzas";

interface Size {
    id: string
    size: string
    price: string
    image: string
    pizzaNameID : string
}

interface Category {
    id: string
    name: string
    description: string
}

interface Pizza {
    id: string
    name: string
    description: string
    unitPrice: number
    sizes: Size[]
    category: Category[]
}

const extraToppings = [
    {id: "extra-cheese", name: "Extra Cheese", price: 1.5},
    {id: "pepperoni", name: "Pepperoni", price: 1.5},
    {id: "mushrooms", name: "Mushrooms", price: 1},
    {id: "onions", name: "Onions", price: 0.75},
    {id: "bell-peppers", name: "Bell Peppers", price: 0.75},
    {id: "olives", name: "Olives", price: 1},
    {id: "pineapple", name: "Pineapple", price: 1},
    {id: "ham", name: "Ham", price: 1.5},
    {id: "bacon", name: "Bacon", price: 1.5},
    {id: "chicken", name: "Grilled Chicken", price: 2},
]

export default function PizzaDetailPage() {
    const params = useParams()
    const router = useRouter()
    // const {addToCart} = useCart()

    const [pizza, setPizza] = useState<Pizza | null>(null)
    const [loading, setLoading] = useState(true)
    const [sizes, setSizes] = useState<Size[]>([])
    const [selectedSize, setSelectedSize] = useState<Size | null>(null)
    const [selectedToppings, setSelectedToppings] = useState<string[]>([])
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const fetchPizza = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`/api/pizza/by-id/${params.id}`)
                if (response.status === 200) {
                    const data = response.data.data
                    setPizza(data)
                    setSizes(data.sizes)
                    if (Array.isArray(data.sizes) && data.sizes.length > 0) {
                        setSelectedSize(data.sizes[0])
                        setTotalPrice(data.sizes[0].unitPrice)
                    }
                } else {
                    router.push("../menu")
                }
            } catch (error) {
                console.error("Error fetching pizza:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPizza()
    }, [params, router])

    useEffect(() => {
        if (pizza && selectedSize) {
            const toppingsTotal = selectedToppings.reduce((sum, toppingId) => {
                const topping = extraToppings.find((t) => t.id === toppingId);
                return sum + (topping?.price || 0);
            }, 0);

            setTotalPrice((parseFloat(selectedSize.price) * quantity) + toppingsTotal);
        }
    }, [pizza, selectedSize, selectedToppings, quantity]);


    const handleSizeChange = (value: string) => {
        const newSize = sizes.find(size => size.id === value);
        if (newSize) {
            setSelectedSize(newSize);
            setTotalPrice(parseFloat(newSize.price) * quantity);
        }
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
    // const handleAddToCart = () => {
    //     if (pizza) {
    //         const selectedSizeObj = sizes.find((s) => s.id === selectedSize)
    //         const selectedToppingsArray = selectedToppings
    //             .map((id) => {
    //                 const topping = extraToppings.find((t) => t.id === id)
    //                 return topping?.name || ""
    //             })
    //             .filter(Boolean)
    //
    //         addToCart({
    //             id: pizza.id,
    //             name: pizza.name,
    //             price: totalPrice / quantity,
    //             quantity,
    //             image: pizza.image,
    //             size: selectedSizeObj?.name || "Medium",
    //             toppings: selectedToppingsArray,
    //         })
    //
    //         toast({
    //             title: "Added to cart",
    //             description: `${quantity} x ${pizza.name} (${selectedSizeObj?.name || "Medium"})`,
    //         })
    //     }
    // }

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-kungfu-pattern">
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading pizza details...</p>
                </div>
            </div>
        )
    }

    if (!pizza) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-kungfu-pattern">
                <div className="text-center">
                    <p className="text-lg text-muted-foreground">Pizza not found</p>
                    <Button asChild className="mt-4 kungfu-button">
                        <Link href="../menu">Back to Menu</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-kungfu-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-kungfu-red/5 to-kungfu-gold/5 z-0"></div>
            <div className="container px-4 relative z-10">
                <Button
                    variant="ghost"
                    size="sm"
                    className="mb-6 text-kungfu-red hover:text-kungfu-darkRed hover:bg-kungfu-red/10"
                    onClick={() => router.push("/menu")}
                >
                    <ChevronLeft className="h-4 w-4 mr-2"/>
                    Back to Menu
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pizza Image */}
                    <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}
                                transition={{duration: 0.6}}>
                        <Card className="overflow-hidden kungfu-card border-kungfu-gold/30">
                            <div className="aspect-square relative">
                                <Image
                                    src={ `https://pizzas.khoav4.com/${pizza.name}.png` || "/placeholder.svg"}
                                    alt={pizza.name}
                                    fill
                                    className="object-cover"
                                />
                                <Badge className="absolute top-4 right-4 bg-kungfu-red text-white">
                                    {Array.isArray(pizza.category) && pizza?.category?.map((catego) => catego.name).join(", ")}
                                </Badge>

                            </div>
                        </Card>
                    </motion.div>

                    {/* Pizza Details and Order Form */}
                    <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold kungfu-text">{pizza.name}</h1>
                                <p className="text-xl font-bold text-kungfu-red mt-2">${pizza.unitPrice}</p>
                                <p className="text-foreground/80 mt-4">{pizza.description}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                                {/*<div className="flex flex-wrap gap-2">*/}
                                {/*    {pizza.ingredients.map((ingredient: string) => (*/}
                                {/*        <Badge key={ingredient} variant="secondary"*/}
                                {/*               className="bg-amber-100 text-amber-800">*/}
                                {/*            {ingredient}*/}
                                {/*        </Badge>*/}
                                {/*    ))}*/}
                                {/*</div>*/}
                            </div>

                            <Tabs defaultValue="customize" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                                    <TabsTrigger
                                        value="customize"
                                        className="data-[state=active]:bg-kungfu-red data-[state=active]:text-white"
                                    >
                                        Customize
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="nutrition"
                                        className="data-[state=active]:bg-kungfu-red data-[state=active]:text-white"
                                    >
                                        Nutrition
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="customize" className="space-y-6 pt-4">
                                    {/* Size Selection */}
                                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                                        <h3 className="text-lg font-semibold mb-3 text-kungfu-darkRed">Choose Size</h3>
                                        <RadioGroup
                                            value={selectedSize?.id}
                                            onValueChange={handleSizeChange}
                                            className="grid grid-cols-2 gap-3"
                                        >
                                            {sizes.map((size) => (
                                                <div key={size.id} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={size.id} id={size.id}
                                                                    className="border-kungfu-red text-kungfu-red"/>
                                                    <Label htmlFor={size.id} className="flex justify-between w-full">
                                                        <span>{size.size}</span>
                                                        <span className="text-kungfu-red font-medium">
                                                    ${(size.price)}
                            </span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>

                                    {/* Extra Toppings */}
                                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                                        <h3 className="text-lg font-semibold mb-3 text-kungfu-darkRed">Extra
                                            Toppings</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {extraToppings.map((topping) => (
                                                <div key={topping.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={topping.id}
                                                        checked={selectedToppings.includes(topping.id)}
                                                        onCheckedChange={() => handleToppingToggle(topping.id)}
                                                        className="border-kungfu-red text-kungfu-red data-[state=checked]:bg-kungfu-red data-[state=checked]:border-kungfu-red"
                                                    />
                                                    <Label htmlFor={topping.id} className="flex justify-between w-full">
                                                        <span>{topping.name}</span>
                                                        <span
                                                            className="text-muted-foreground">+${topping.price}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100">
                                        <h3 className="text-lg font-semibold mb-3 text-kungfu-darkRed">Quantity</h3>
                                        <div className="flex items-center space-x-3">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(-1)}
                                                disabled={quantity <= 1}
                                                className="border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10 hover:text-kungfu-darkRed"
                                            >
                                                <Minus className="h-4 w-4"/>
                                            </Button>
                                            <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(1)}
                                                className="border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10 hover:text-kungfu-darkRed"
                                            >
                                                <Plus className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="nutrition" className="space-y-4 pt-4">
                                    <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100 space-y-2">
                                        <div className="flex justify-between py-2 border-b border-amber-200">
                                            <span className="font-medium">Calories</span>
                                            <span>250-350 per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-amber-200">
                                            <span className="font-medium">Protein</span>
                                            <span>12-15g per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-amber-200">
                                            <span className="font-medium">Carbohydrates</span>
                                            <span>30-35g per slice</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-amber-200">
                                            <span className="font-medium">Fat</span>
                                            <span>10-15g per slice</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-4">
                                            Nutritional values are approximate and may vary based on size and toppings.
                                        </p>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Total and Add to Cart */}
                            <div className="pt-4 border-t border-amber-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium">Total:</span>
                                    <span className="text-2xl font-bold text-kungfu-red">${totalPrice}</span>
                                </div>
                                <Button className="w-full kungfu-button" size="lg"
                                        onClick={() => console.log("Add to cart")}>
                                    <ShoppingCart className="h-5 w-5 mr-2"/>
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                    <FeaturedPizzas pizza_name_id={pizza.sizes[0].pizzaNameID }/>
                </div>
            </div>
        </div>
    )
}