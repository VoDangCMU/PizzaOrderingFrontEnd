
import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

export interface CartItem {
    id: string
    quantity: number
    note: string
    createdAt: string
    updatedAt: string
    pizza: {
        id: string
        name: string
        description: string
        unitPrice: string
        createdAt: string
        updatedAt: string
    }
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

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    // Update localStorage and totals when cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))

        // Calculate totals
        const items = cartItems.reduce((sum, item) => sum + item.quantity, 0)
        const price = cartItems.reduce((sum, item) => sum + Number.parseFloat(item.pizza.unitPrice) * item.quantity, 0)

        setTotalItems(items)
        setTotalPrice(price)
    }, [cartItems])

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex((i) => i.id === item.id)

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
        setCartItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)))
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

