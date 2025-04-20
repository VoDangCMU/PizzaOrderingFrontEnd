"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Search, ShoppingCart, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

// Interface cho kết quả gợi ý
interface SuggestedPizza {
    id: string
    name: string
    image: string
}

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export function MobileMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [suggestedPizzas, setSuggestedPizzas] = useState<SuggestedPizza[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(false)
    const { cartItems } = useCart()
    const { isLoggedIn, user } = useAuth()
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

        // Clear timeout cũ nếu có
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current)
        }

        if (query.trim() === "") {
            setSuggestedPizzas([])
            setShowSuggestions(false)
            return
        }

        const ai_api = localStorage.getItem("ai_api")
        // Set timeout mới - 4 giây
        searchTimeout.current = setTimeout(async () => {
            setIsLoading(true)
            try {
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
        }, 4000) // 4 giây debounce
    }

    // Xử lý khi chọn một pizza
    const handleSelectPizza = (id: string) => {
        setShowSuggestions(false)
        setSearchQuery("")
        setIsMobileMenuOpen(false)
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
        <div className="md:hidden z-50 flex items-center gap-3">
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

            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground"
            >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center pt-20 z-40"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-full max-w-xs px-4" ref={searchRef}>
                            <form onSubmit={handleSubmit} className="relative">
                                <Input
                                    type="search"
                                    placeholder="Search for pizzas..."
                                    className="pr-8"
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
                                <div className="absolute mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-auto w-full max-w-xs">
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
                        </div>

                        <nav className="flex flex-col items-center gap-8 mt-8 overflow-y-auto flex-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-xl font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs px-4">
                                {isLoggedIn ? (
                                    <div className="flex items-center justify-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user?.image || ""} alt={user?.lastName || "User"} />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {user?.lastName?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-center">
                                            <p className="font-medium">{user?.lastName || "User"}</p>
                                            <Button
                                                variant="link"
                                                className="p-0 h-auto text-sm text-muted-foreground"
                                                onClick={() => {
                                                    // Handle logout
                                                    setIsMobileMenuOpen(false)
                                                }}
                                            >
                                                Sign out
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="w-full bg-kungfu-red hover:bg-kungfu-darkRed text-white"
                                        >
                                            <Link href="../auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                Login
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="default"
                                            className="w-full bg-kungfu-gold hover:bg-kungfu-darkGold text-white"
                                        >
                                            <Link href="../auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                                Register
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
