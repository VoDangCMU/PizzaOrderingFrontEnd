"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles, BookOpen } from "lucide-react"

export function BlogHeader() {
    return (
        <div className="relative mb-12">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            </div>

            <motion.div
                className="text-center relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    className="inline-block mb-4 relative"
                    initial={{ scale: 0.8, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-red-500 rounded-full blur-md opacity-50"></div>
                    <div className="relative bg-white rounded-full p-4">
                        <BookOpen className="h-12 w-12 text-kungfu-red" />
                    </div>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-kungfu-red via-red-600 to-amber-700 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Pizza Review Scrolls
                </motion.h1>

                <motion.p
                    className="text-lg max-w-2xl mx-auto text-foreground/80 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Sparkles className="inline-block h-4 w-4 mr-2 text-amber-500" />
                    Discover the art of pizza through the eyes of our kungfu masters
                    <Sparkles className="inline-block h-4 w-4 ml-2 text-amber-500" />
                </motion.p>

                {/* Decorative divider */}
                <motion.div
                    className="mt-8 max-w-md mx-auto flex items-center justify-center gap-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-grow"></div>
                    <Image src="/kungfu-divider.png" alt="Kungfu Divider" width={80} height={20} className="object-contain" />
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent flex-grow"></div>
                </motion.div>
            </motion.div>
        </div>
    )
}
