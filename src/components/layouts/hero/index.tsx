"use client"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { HeroBackground } from "./hero-background"
import { HeroContent } from "./hero-content"

export default function HeroSection() {
    const scrollToContent = () => {
        const contentSection = document.getElementById("content-section")
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground />
            <HeroContent />
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                onClick={scrollToContent}
            >
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                    <ChevronDown className="h-10 w-10 text-kungfu-red" />
                </motion.div>
            </motion.div>
        </section>
    )
}

