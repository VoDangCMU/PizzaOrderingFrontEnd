"use client"

import { useState, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"

interface Pizza {
    id: string
    name: string
    description: string
    unitPrice: string
    createdAt: string
    updatedAt: string
}

export interface CartItem {
    id: string
    quantity: number
    createdAt: string
    updatedAt: string
    note: string
    pizza: Pizza
}

interface CartContextType {
    cartItems: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    totalItems: 0,
    totalPrice: 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))

        const items = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        const price = cartItems.reduce((sum, item) => sum + parseFloat(item.pizza.unitPrice) * item.quantity, 0)

        setTotalItems(items)
        setTotalPrice(price)
    }, [cartItems])

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex((i) => i.pizza.id === item.pizza.id)

            if (existingItemIndex >= 0) {
                const updatedItems = [...prev]
                updatedItems[existingItemIndex].quantity += item.quantity
                return updatedItems
            } else {
                return [...prev, item]
            }
        })
    }

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.pizza.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev.map((item) => (item.pizza.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
