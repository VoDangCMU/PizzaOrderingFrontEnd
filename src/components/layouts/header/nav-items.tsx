"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export function NavItems() {
    return (
        <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
                <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                >
                    <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary relative group">
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </motion.div>
            ))}
        </nav>
    )
}

