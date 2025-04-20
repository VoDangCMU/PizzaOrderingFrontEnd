"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart, X, AlertCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useCart } from "@/hooks/use-cart"
import { useSelector } from "react-redux"
import { selectAuth } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"

// Interface cho kết quả gợi ý
interface SuggestedPizza {
    id: string
    name: string
    image: string
}

export function UserActions() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestedPizzas, setSuggestedPizzas] = useState<SuggestedPizza[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const { cartItems } = useCart()
    const { userId, username } = useSelector(selectAuth)
    const isAuthed = userId !== null
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const searchTimeout = useRef<NodeJS.Timeout | null>(null)

    // Xử lý click bên ngoài để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Xử lý tìm kiếm với debounce 4 giây
    const handleSearch = (query: string) => {
        setSearchQuery(query)
        const ai_api = localStorage.getItem("ai_api")

        // Clear timeout cũ nếu có
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current)
        }

        if (query.trim() === "") {
            setSuggestedPizzas([])
            setShowSuggestions(false)
            return
        }

        // Set timeout mới - 4 giây
        searchTimeout.current = setTimeout(async () => {
            setIsLoading(true)
            try {
                // Gọi API tìm kiếm
                const response = await fetch(`${ai_api}/search_NLP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: query }),
                })


                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                const data = await response.json()

                // Chuyển đổi dữ liệu thành định dạng cần thiết
                const pizzas = data.suggested_pizzas.map((name : string, index : number) => ({
                    id: `pizza-${index + 1}`,
                    name,
                    image: `https://pizzas.khoav4.com/${encodeURIComponent(name)}.png`,
                }))

                setSuggestedPizzas(pizzas)
                setShowSuggestions(true)
            } catch (error) {
                console.error("Error searching pizzas:", error)
            } finally {
                setIsLoading(false)
            }
        }, 2000) // 4 giây debounce
    }

    // Xử lý khi chọn một pizza
    const handleSelectPizza = (id: string) => {
        setShowSuggestions(false)
        setSearchQuery("")
        router.push(`/menu/${id}`)
    }

    // Xử lý khi submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (suggestedPizzas.length > 0) {
            handleSelectPizza(suggestedPizzas[0].id)
        }
    }

    return (
        <div className="hidden md:flex items-center gap-4">
            <AnimatePresence>
                {isSearchOpen ? (
                    <motion.div
                        ref={searchRef}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "300px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <form onSubmit={handleSubmit}>
                            <Input
                                type="search"
                                placeholder="Search for pizzas..."
                                className="pr-8"
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => {
                                    if (suggestedPizzas.length > 0) {
                                        setShowSuggestions(true)
                                    }
                                }}
                            />
                            {searchQuery ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery("")
                                        setSuggestedPizzas([])
                                    }}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            ) : (
                                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            )}
                        </form>

                        {/* Dropdown gợi ý */}
                        {showSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-80 overflow-auto">
                                {isLoading ? (
                                    <div className="p-4 text-center text-sm text-muted-foreground">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                            <span>Searching...</span>
                                        </div>
                                    </div>
                                ) : suggestedPizzas.length > 0 ? (
                                    <>
                                        <ul className="py-1">
                                            {suggestedPizzas.map((pizza) => (
                                                <li key={pizza.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleSelectPizza(pizza.id)}
                                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                                                    >
                                                        <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                                                            <Image
                                                                src={pizza.image || "/placeholder.svg"}
                                                                alt={pizza.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                                onError={(e) => {
                                                                    // Fallback image if the pizza image fails to load
                                                                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=48&width=48"
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="line-clamp-2">{pizza.name}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="p-2 text-xs text-center text-muted-foreground border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                <span>Báo cáo đề xuất tìm kiếm không phù hợp</span>
                                            </div>
                                        </div>
                                    </>
                                ) : searchQuery.trim() !== "" ? (
                                    <div className="p-4 text-center text-sm text-muted-foreground">No results found</div>
                                ) : null}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSearchOpen(true)}
                        className="text-foreground hover:text-primary transition-colors"
                    >
                        <Search className="h-5 w-5" />
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
            >
                <Button asChild variant="ghost" size="icon" className="relative">
                    <Link href="../cart">
                        <ShoppingCart className="h-5 w-5" />
                        {cartItems.length > 0 && (
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-white">
                                {cartItems.length}
                            </Badge>
                        )}
                    </Link>
                </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
                {isAuthed ? (
                    <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarImage src={"https://i.imgur.com/Clt9Lmg.png"} alt={username || "User"} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{username?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="kungfu" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white">
                            <Link href="../auth/login">Login</Link>
                        </Button>
                        <Button asChild size="sm" variant="kungfu" className="bg-kungfu-gold hover:bg-kungfu-darkGold text-white">
                            <Link href="../auth/register">Register</Link>
                        </Button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
