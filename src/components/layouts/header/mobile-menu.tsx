"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Search, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export function MobileMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { cartItems } = useCart()
    const { isLoggedIn, user } = useAuth()

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
                        className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-40"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-full max-w-xs mb-8 px-4">
                            <div className="relative">
                                <Input type="search" placeholder="Search..." className="pr-8" />
                                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        <nav className="flex flex-col items-center gap-8">
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
                                            variant="kungfu"
                                            className="w-full bg-kungfu-red hover:bg-kungfu-darkRed text-white"
                                        >
                                            <Link href="../auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                                Login
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="kungfu"
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

