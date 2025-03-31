"use client"

import { motion } from "framer-motion"

export function BlogHeader() {
    return (
        <div className="text-center mb-12">
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4 kungfu-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Pizza Review Scrolls
            </motion.h1>
            <motion.p
                className="text-lg max-w-2xl mx-auto text-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Discover the art of pizza through the eyes of our kungfu masters
            </motion.p>
        </div>
    )
}

