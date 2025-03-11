"use client"

import { useState, useEffect } from "react"
import { Logo } from "./logo"
import { NavItems } from "./nav-items"
import { UserActions } from "./user-action"
import { MobileMenu } from "./mobile-menu"

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "py-4 bg-transparent"
            }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Logo />
                <NavItems />
                <UserActions />
                <MobileMenu />
            </div>
        </header>
    )
}

