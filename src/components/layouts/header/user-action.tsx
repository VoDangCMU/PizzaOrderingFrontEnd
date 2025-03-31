"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/hooks/use-cart"
import {useSelector} from "react-redux";
import {selectAuth} from "@/store/slices/authSlice";



export function UserActions() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const { cartItems } = useCart()
    const {userId, username} = useSelector(selectAuth);
    const isAuthed = userId !== null

    return (
        <div className="hidden md:flex items-center gap-4">
            <AnimatePresence>
                {isSearchOpen ? (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "200px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pr-8"
                            autoFocus
                            onBlur={() => setIsSearchOpen(false)}
                        />
                        <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {username?.charAt(0) || "U"}
                        </AvatarFallback>
                    </Avatar>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="kungfu" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white">
                            <Link href="../auth/login">Login</Link>
                        </Button>
                        <Button
                            asChild
                            size="sm"
                            variant="kungfu"
                            className="bg-kungfu-gold hover:bg-kungfu-darkGold text-white"
                        >
                            <Link href="../auth/register">Register</Link>
                        </Button>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

