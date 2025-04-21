"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"

interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    avatar: string
    address: string
}

interface Pizza {
    id: string
    name: string
    description: string
    unitPrice: string
}

interface Size {
    id: string
    size: string
    price: string
    image: string
}

interface OrderItem {
    id: string
    quantity: number
    note: string
    pizza: Pizza
    size: Size
    crust: []
    outerCrust: []
    extra: []
}

interface Cart {
    id: string
    createdAt: string
    updatedAt: string
    user: User
    orderItems: OrderItem[]
}

// Mock data based on the provided API response
const mockCartData: Cart[] = [
    {
        id: "1185",
        createdAt: "2015-01-01T11:38:36.000Z",
        updatedAt: "2025-04-08T21:16:23.354Z",
        user: {
            id: "1195",
            username: "Vita671744146984395",
            firstName: "Doyle",
            lastName: "Rosenbaum",
            email: "1744146984451@gmail.com",
            avatar: "https://i.imgur.com/oKuKLoh.png",
            address: "1203 Orrin Pine",
        },
        orderItems: [
            {
                id: "2697",
                quantity: 1,
                note: "",
                pizza: {
                    id: "166",
                    name: "The Hawaiian Pizza",
                    description:
                        "Fresh lime leaves with a pinch of cinnamon, topped by a caramelized elderberry with whipped cream",
                    unitPrice: "10",
                },
                crust: [],
                outerCrust: [],
                extra: [],
                size: {
                    id: "753",
                    size: "M",
                    price: "13.25",
                    image: "https://i.imgur.com/tHiEYPf.png",
                },
            },
        ],
    },
    {
        id: "1186",
        createdAt: "2015-01-01T11:57:40.000Z",
        updatedAt: "2025-04-08T21:16:24.113Z",
        user: {
            id: "1196",
            username: "Dewayne.Littel731744146985202",
            firstName: "Sandra",
            lastName: "Conroy",
            email: "1744146985259@gmail.com",
            avatar: "https://i.imgur.com/oKuKLoh.png",
            address: "75573 3rd Avenue",
        },
        orderItems: [
            {
                id: "2698",
                quantity: 1,
                note: "",
                pizza: {
                    id: "167",
                    name: "The Classic Deluxe Pizza",
                    description:
                        "An exquisite pigeon roast, infused with the essence of corella pear, slow-roasted to bring out its natural flavors and served with a side of creamy spinach",
                    unitPrice: "10",
                },
                crust: [],
                outerCrust: [],
                extra: [],
                size: {
                    id: "756",
                    size: "M",
                    price: "16",
                    image: "https://i.imgur.com/tHiEYPf.png",
                },
            },
            {
                id: "2699",
                quantity: 1,
                note: "",
                pizza: {
                    id: "168",
                    name: "The Five Cheese Pizza",
                    description:
                        "A special orchid milk chocolate from Zambia. To support the strong flavor it is sided with a tablespoon of sesame seed.",
                    unitPrice: "10",
                },
                crust: [],
                outerCrust: [],
                extra: [],
                size: {
                    id: "759",
                    size: "L",
                    price: "18.5",
                    image: "https://i.imgur.com/tHiEYPf.png",
                },
            },
            {
                id: "2700",
                quantity: 1,
                note: "",
                pizza: {
                    id: "169",
                    name: "The Italian Supreme Pizza",
                    description: "A simple apple pie. No fancy stuff. Just pie.",
                    unitPrice: "10",
                },
                crust: [],
                outerCrust: [],
                extra: [],
                size: {
                    id: "760",
                    size: "L",
                    price: "20.75",
                    image: "https://i.imgur.com/tHiEYPf.png",
                },
            },
        ],
    },
]

export default function CartPage() {
    const router = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    // Fetch cart data (mock)
    useEffect(() => {
        const fetchCartData = async () => {
            setIsLoading(true)
            try {
                // In a real app, this would be an API call
                await new Promise((resolve) => setTimeout(resolve, 800))
                setCarts(mockCartData)
            } catch (error) {
                console.error("Error fetching cart data:", error)
                toast({
                    title: "Error",
                    description: "Failed to load cart data. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        fetchCartData()
    }, [])

    // Calculate total items across all carts
    const totalItems = carts.reduce((total, cart) => {
        return (
            total +
            cart.orderItems.reduce((itemTotal, item) => {
                return itemTotal + item.quantity
            }, 0)
        )
    }, 0)

    // Calculate subtotal across all carts
    const subtotal = carts.reduce((total, cart) => {
        return (
            total +
            cart.orderItems.reduce((itemTotal, item) => {
                return itemTotal + item.quantity * Number.parseFloat(item.size.price)
            }, 0)
        )
    }, 0)

    // Calculate tax, delivery fee, and total
    const tax = subtotal * 0.08
    const deliveryFee = subtotal > 30 ? 0 : 3.99
    const total = subtotal + tax + deliveryFee

    // Handle quantity change
    const handleQuantityChange = (cartId: string, itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return

        setCarts((prevCarts) =>
            prevCarts.map((cart) => {
                if (cart.id === cartId) {
                    return {
                        ...cart,
                        orderItems: cart.orderItems.map((item) => {
                            if (item.id === itemId) {
                                return {
                                    ...item,
                                    quantity: newQuantity,
                                }
                            }
                            return item
                        }),
                    }
                }
                return cart
            }),
        )
    }

    // Handle remove item
    const handleRemoveItem = (cartId: string, itemId: string) => {
        setCarts(
            (prevCarts) =>
                prevCarts
                    .map((cart) => {
                        if (cart.id === cartId) {
                            return {
                                ...cart,
                                orderItems: cart.orderItems.filter((item) => item.id !== itemId),
                            }
                        }
                        return cart
                    })
                    .filter((cart) => cart.orderItems.length > 0), // Remove empty carts
        )

        toast({
            title: "Item removed",
            description: "The item has been removed from your cart.",
        })
    }

    // Handle checkout
    const handleCheckout = async () => {
        setIsCheckingOut(true)

        try {
            // Simulate checkout process
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Success
            toast({
                title: "Order placed successfully!",
                description: "Your delicious pizza is on its way to you.",
            })

            // Clear cart and redirect to home
            setCarts([])
            router.push("/")
        } catch (error) {
            console.error("Checkout failed:", error)
            toast({
                title: "Checkout failed",
                description: "There was an error processing your order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsCheckingOut(false)
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-kungfu-pattern">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg text-muted-foreground">Loading your cart...</p>
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
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                </Button>

                <motion.h1
                    className="text-3xl md:text-4xl font-bold mb-8 kungfu-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Your Cart
                </motion.h1>

                {carts.length > 0 && totalItems > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <motion.div
                            className="lg:col-span-2 space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {carts.map((cart) => (
                                <div key={cart.id} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold">Order #{cart.id.slice(-4)}</h2>
                                        <p className="text-sm text-muted-foreground">{new Date(cart.updatedAt).toLocaleDateString()}</p>
                                    </div>

                                    {cart.orderItems.map((item) => (
                                        <Card key={item.id} className="overflow-hidden kungfu-card border-kungfu-gold/30">
                                            <div className="flex flex-col sm:flex-row">
                                                <div className="w-full sm:w-1/4 aspect-square relative">
                                                    <Image
                                                        src={item.size.image || "https://i.imgur.com/tHiEYPf.png"}
                                                        alt={item.pizza.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 p-4">
                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                                        <div>
                                                            <h3 className="text-xl font-bold">{item.pizza.name}</h3>
                                                            <p className="text-sm text-muted-foreground">Size: {item.size.size}</p>
                                                            {item.note && <p className="text-sm text-muted-foreground mt-1">Note: {item.note}</p>}
                                                        </div>
                                                        <div className="mt-2 sm:mt-0 text-right">
                                                            <p className="text-lg font-bold text-kungfu-red">
                                                                ${(Number.parseFloat(item.size.price) * item.quantity).toFixed(2)}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">${item.size.price} each</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10"
                                                                onClick={() => handleQuantityChange(cart.id, item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </Button>
                                                            <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8 border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10"
                                                                onClick={() => handleQuantityChange(cart.id, item.id, item.quantity + 1)}
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </Button>
                                                        </div>

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-muted-foreground hover:text-kungfu-red"
                                                            onClick={() => handleRemoveItem(cart.id, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ))}
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Card className="kungfu-card border-kungfu-gold/30">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="bg-amber-200" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-kungfu-red">${total.toFixed(2)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full kungfu-button" size="lg" onClick={handleCheckout} disabled={isCheckingOut}>
                                        {isCheckingOut ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="h-5 w-5 mr-2" />
                                                Checkout
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>

                            <div className="mt-6 text-center text-sm text-muted-foreground">
                                <p className="flex items-center justify-center">
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Secure Checkout
                                </p>
                                <p className="mt-2">Free delivery for orders over $30</p>
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="max-w-md mx-auto">
                            <div className="bg-amber-100/50 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                <ShoppingBag className="h-12 w-12 text-kungfu-red/70" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2 kungfu-text">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-6">Looks like you have not added any pizzas to your cart yet.</p>
                            <Button asChild size="lg" className="kungfu-button">
                                <Link href="/menu">Browse Menu</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
