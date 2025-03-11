"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function Logo() {
    return (
        <Link href="../" className="flex items-center gap-2 z-50">
            <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative w-16 h-16"
            >
                <Image
                    src="https://i.imgur.com/pclqHD4.jpeg"
                    alt="Võ Đang Pizza Logo"
                    width={64}
                    height={64}
                    className="object-contain"
                />
            </motion.div>
            <motion.span
                className="text-xl font-bold tracking-tight kungfu-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                Võ Đang Pizza
            </motion.span>
        </Link>
    )
}

