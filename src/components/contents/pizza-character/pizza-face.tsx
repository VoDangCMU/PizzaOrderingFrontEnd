"use client"

import { motion } from "framer-motion"

interface PizzaFaceProps {
    isPasswordFocused: boolean
    eyePosition: { x: number; y: number }
}

export function PizzaFace({ isPasswordFocused, eyePosition }: PizzaFaceProps) {
    return (
        <div className="absolute inset-0 z-20">
            <div className="absolute left-[35%] top-[40%] w-[10%] h-[10%] bg-white rounded-full flex items-center justify-center shadow-sm">
                <motion.div
                    className="w-[60%] h-[60%] bg-black rounded-full"
                    animate={{ x: isPasswordFocused ? 0 : eyePosition.x, y: isPasswordFocused ? 0 : eyePosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                ></motion.div>
            </div>
            <div className="absolute left-[55%] top-[40%] w-[10%] h-[10%] bg-white rounded-full flex items-center justify-center shadow-sm">
                <motion.div
                    className="w-[60%] h-[60%] bg-black rounded-full"
                    animate={{ x: isPasswordFocused ? 0 : eyePosition.x, y: isPasswordFocused ? 0 : eyePosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                ></motion.div>
            </div>
            <motion.div
                className="absolute left-[45%] top-[60%] w-[10%] h-[2%] bg-black rounded-full"
                animate={{
                    width: isPasswordFocused ? "15%" : "10%",
                    height: isPasswordFocused ? "5%" : "2%",
                    left: isPasswordFocused ? "42.5%" : "45%",
                    borderRadius: isPasswordFocused ? "9999px 9999px 0 0" : "9999px",
                }}
                transition={{ duration: 0.3 }}
            ></motion.div>
        </div>
    )
}

