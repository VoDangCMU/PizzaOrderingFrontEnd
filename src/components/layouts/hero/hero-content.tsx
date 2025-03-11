"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroContent() {
    return (
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
                    <span className="kungfu-text">Martial Arts</span> Meets <span className="kungfu-text">Pizza Perfection</span>
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
    )
}

