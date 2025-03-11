"use client"

import { motion } from "framer-motion"

export function PizzaBase() {
    return (
        <motion.div
            className="absolute inset-0 rounded-full bg-pizza-crust border-4 border-[#C69C6D] shadow-md overflow-hidden"
            animate={{
                scale: [0.98, 1, 0.98],
                rotate: [0, 1, 0, -1, 0],
            }}
            transition={{
                scale: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY },
            }}
        >
            <div className="absolute inset-0 rounded-full border-8 border-[#E2B87F]/60"></div>
            <div className="absolute inset-[8%] rounded-full bg-pizza-sauce">
                <div className="absolute inset-0 bg-[radial-gradient(circle,#D62828_30%,#B51A1A_100%)]"></div>
            </div>
            <div className="absolute inset-[12%] rounded-full bg-pizza-cheese">
                <div className="absolute inset-0 bg-[radial-gradient(circle,#F9DC5C_30%,#E8CB4A_100%)]"></div>
            </div>
        </motion.div>
    )
}

