"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    // Scroll to content section when clicking the scroll button
    const scrollToContent = () => {
        const contentSection = document.getElementById("content-section")
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with parallax effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-kungfu-red/20 to-kungfu-gold/20"
                style={{ y, opacity }}
            >
                <div className="absolute inset-0 bg-kungfu-pattern opacity-20"></div>
            </motion.div>

            {/* Kungfu elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <Image src="/kungfu-symbol-1.png" alt="Kungfu Symbol" width={128} height={128} className="object-contain" />
                </motion.div>

                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <Image src="/kungfu-symbol-2.png" alt="Kungfu Symbol" width={160} height={160} className="object-contain" />
                </motion.div>

                <motion.div
                    className="absolute top-1/2 right-1/3 w-24 h-24 opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                    <Image src="/kungfu-symbol-3.png" alt="Kungfu Symbol" width={96} height={96} className="object-contain" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div
                        className="mb-6 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src="/kungfu-emblem-large.png"
                            alt="Kungfu Pizza Emblem"
                            width={150}
                            height={150}
                            className="object-contain"
                        />
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="kungfu-text">Martial Arts</span> Meets{" "}
                        <span className="kungfu-text">Pizza Perfection</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl mb-8 text-foreground/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Experience the harmony of flavors mastered through centuries of tradition. Our pizza masters blend ancient
                        techniques with modern ingredients.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Button asChild size="lg" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                            <Link href="/menu">Explore Our Menu</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10 btn-hover"
                        >
                            <Link href="/about">Our Philosophy</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
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

