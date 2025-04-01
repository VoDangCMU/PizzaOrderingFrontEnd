"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Scroll, FlameIcon as Fire, Heart } from "lucide-react"

const values = [
    {
        icon: Scroll,
        title: "Ancient Traditions",
        description:
            "Our recipes are passed down through generations, preserving the authentic techniques of pizza crafting.",
    },
    {
        icon: Fire,
        title: "Disciplined Preparation",
        description:
            "Each pizza is crafted with the focus and precision of a martial arts master, ensuring perfection in every slices.",
    },
    {
        icon: Heart,
        title: "Harmony of Flavors",
        description:
            "We balance ingredients like a master balances chi, creating a perfect harmony of flavors in every bite.",
    },
]

export default function MartialArtsValues() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    return (
        <section ref={ref} className="py-20 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold mb-4 text-gradient"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Martial Arts Values
                    </motion.h2>
                    <motion.p
                        className="text-lg max-w-2xl mx-auto text-foreground/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We apply the principles of martial arts to the art of pizza making, creating an experience that nourishes
                        body and spirit.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.2 * index }}
                            className="flex flex-col items-center text-center p-8 rounded-2xl glassmorphism"
                        >
                            <motion.div
                                className="bg-gradient-to-br from-primary to-accent p-5 rounded-full mb-6 text-white"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <value.icon className="h-10 w-10" />
                            </motion.div>
                            <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                            <p className="text-foreground/80">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

