"use client"

import { useEffect, useState } from "react"
import { CartHeader } from "@/components/contents/cart/cart-header"
import { CartItemList } from "@/components/contents/cart/cart-item-list"
import { CartSummary } from "@/components/contents/cart/cart-summary"
import { EmptyCart } from "@/components/contents/cart/empty-cart"
import { useCart } from "@/hooks/use-cart"
import type { CartItem } from "@/hooks/use-cart"

interface CartResponse {
    data: {
        id: string
        createdAt: string
        updatedAt: string
        cartItems: CartItem[]
    }
    statusCode: number
}

export default function CartPage() {
    const { cartItems: storedCartItems, addToCart, clearCart } = useCart()
    const [isLoading, setIsLoading] = useState(true)
    console.log(storedCartItems)
    useEffect(() => {
        const fetchCartData = async () => {
            setIsLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 800))

                const mockResponse: CartResponse = {
                    data: {
                        id: "1",
                        createdAt: "2025-03-31T21:27:29.335Z",
                        updatedAt: "2025-03-31T21:27:29.335Z",
                        cartItems: [
                            {
                                id: "1",
                                quantity: 1,
                                createdAt: "2025-03-31T21:28:07.856Z",
                                updatedAt: "2025-03-31T21:28:07.856Z",
                                note: "",
                                pizza: {
                                    id: "72",
                                    name: "The Italian Capocollo Pizza",
                                    description:
                                        "An exquisite beef roast, infused with the essence of goji berry, slow-roasted to bring out its natural flavors and served with a side of creamy bok choy",
                                    unitPrice: "20.5",
                                    createdAt: "2025-03-26T19:26:10.361Z",
                                    updatedAt: "2025-03-26T19:26:10.361Z",
                                },
                            },
                        ],
                    },
                    statusCode: 200,
                }

                clearCart()
                mockResponse.data.cartItems.forEach((item) => {
                    addToCart(item)
                })
            } catch (error) {
                console.error("Error fetching cart data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCartData()
    }, [addToCart, clearCart])

    const { cartItems } = useCart()
    const isEmpty = cartItems.length === 0

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-kungfu-red border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <CartHeader />

                {isEmpty ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <CartItemList items={cartItems} />
                        </div>
                        <div>
                            <CartSummary />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

