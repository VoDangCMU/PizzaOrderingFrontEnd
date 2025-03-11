"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"
import { WudangLogo } from "@/components/layouts/wudang-logo"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/menu" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/public" className="flex items-center gap-2">
                    <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <WudangLogo className="h-10 w-10" />
                    </motion.div>
                    <span className="text-xl font-bold tracking-tight">Võ Đang Pizza</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                            {item.name}
                        </Link>
                    ))}
                    <Button asChild size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        <Link href="../auth/login">Login</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                        <Link href="../auth/register">Register</Link>
                    </Button>
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-4 mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-4">
                                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                                    <Link href="../auth/login" onClick={() => setIsOpen(false)}>
                                        Login
                                    </Link>
                                </Button>
                                <Button asChild className="bg-primary hover:bg-primary/90">
                                    <Link href="../auth/register" onClick={() => setIsOpen(false)}>
                                        Register
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

