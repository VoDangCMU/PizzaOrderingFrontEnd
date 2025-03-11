"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function HeroBackground() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    return (
        <motion.div
            ref={ref}
            className="absolute inset-0 bg-gradient-to-br from-kungfu-red/20 to-kungfu-gold/20"
            style={{ y, opacity }}
        >
            <div className="absolute inset-0 bg-kungfu-pattern opacity-20"></div>
        </motion.div>
    )
}

