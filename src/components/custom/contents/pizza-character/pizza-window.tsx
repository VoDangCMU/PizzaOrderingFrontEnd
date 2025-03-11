"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PizzaWindowProps {
    isPasswordFocused: boolean
}

export function PizzaWindow({ isPasswordFocused }: PizzaWindowProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const pizzaRef = useRef<HTMLDivElement>(null)
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (pizzaRef.current) {
                const pizzaRect = pizzaRef.current.getBoundingClientRect()
                const pizzaCenterX = pizzaRect.left + pizzaRect.width / 2
                const pizzaCenterY = pizzaRect.top + pizzaRect.height / 2

                // Calculate mouse position relative to pizza center
                const mouseX = e.clientX - pizzaCenterX
                const mouseY = e.clientY - pizzaCenterY

                setMousePosition({ x: mouseX, y: mouseY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Calculate eye movement based on mouse position
    useEffect(() => {
        if (!isPasswordFocused) {
            // Limit eye movement range
            const maxEyeMove = 5
            const eyeX = Math.min(Math.max(mousePosition.x / 20, -maxEyeMove), maxEyeMove)
            const eyeY = Math.min(Math.max(mousePosition.y / 20, -maxEyeMove), maxEyeMove)

            setEyePosition({ x: eyeX, y: eyeY })
        } else {
            setEyePosition({ x: 0, y: 0 })
        }
    }, [mousePosition, isPasswordFocused])

    return (
        <div ref={pizzaRef} className="relative w-full h-full">
            {/* Window Frame */}
            <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-gray-200 to-gray-400 p-2 shadow-lg">
                {/* Window Glass */}
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-100/30 to-blue-200/30 backdrop-blur-sm border-2 border-gray-300/50 overflow-hidden">
                    {/* Window Reflection */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[10%] bg-white/20 blur-sm transform -rotate-15"></div>
                </div>

                {/* Window Frame Details */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-500/20"></div>

                {/* Window Screws */}
                <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-gray-600 flex items-center justify-center">
                    <div className="w-1 h-[1px] bg-gray-400 rotate-45"></div>
                    <div className="w-1 h-[1px] bg-gray-400 -rotate-45"></div>
                </div>
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gray-600 flex items-center justify-center">
                    <div className="w-1 h-[1px] bg-gray-400 rotate-45"></div>
                    <div className="w-1 h-[1px] bg-gray-400 -rotate-45"></div>
                </div>
                <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-gray-600 flex items-center justify-center">
                    <div className="w-1 h-[1px] bg-gray-400 rotate-45"></div>
                    <div className="w-1 h-[1px] bg-gray-400 -rotate-45"></div>
                </div>
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-gray-600 flex items-center justify-center">
                    <div className="w-1 h-[1px] bg-gray-400 rotate-45"></div>
                    <div className="w-1 h-[1px] bg-gray-400 -rotate-45"></div>
                </div>
            </div>

            {/* Pizza Character (Round Pizza) */}
            <div className="absolute inset-0 z-10">
                {/* Pizza Base */}
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
                    {/* Crust Texture */}
                    <div className="absolute inset-0 rounded-full border-8 border-[#E2B87F]/60"></div>

                    {/* Sauce Layer */}
                    <div className="absolute inset-[8%] rounded-full bg-pizza-sauce">
                        {/* Sauce Texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle,#D62828_30%,#B51A1A_100%)]"></div>
                    </div>

                    {/* Cheese Layer */}
                    <div className="absolute inset-[12%] rounded-full bg-pizza-cheese">
                        {/* Cheese Texture */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle,#F9DC5C_30%,#E8CB4A_100%)]"></div>

                        {/* Cheese Bubbles */}
                        <div className="absolute left-[20%] top-[30%] w-2 h-2 rounded-full bg-[#F0C61F]/70"></div>
                        <div className="absolute left-[70%] top-[25%] w-3 h-3 rounded-full bg-[#F0C61F]/70"></div>
                        <div className="absolute left-[40%] top-[70%] w-2 h-2 rounded-full bg-[#F0C61F]/70"></div>
                        <div className="absolute left-[60%] top-[60%] w-2 h-2 rounded-full bg-[#F0C61F]/70"></div>
                    </div>

                    {/* Pepperoni Slices */}
                    <motion.div
                        className="absolute left-[25%] top-[30%] w-[15%] h-[15%] rounded-full"
                        animate={{ scale: [1, 1.03, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        style={{
                            background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    ></motion.div>

                    <motion.div
                        className="absolute left-[60%] top-[25%] w-[18%] h-[18%] rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        style={{
                            background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    ></motion.div>

                    <motion.div
                        className="absolute left-[40%] top-[55%] w-[16%] h-[16%] rounded-full"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                        style={{
                            background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    ></motion.div>

                    <motion.div
                        className="absolute left-[70%] top-[60%] w-[14%] h-[14%] rounded-full"
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                        style={{
                            background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                            boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
                        }}
                    ></motion.div>
                </motion.div>

                {/* Pizza Face */}
                <div className="absolute inset-0 z-20">
                    {/* Eyes */}
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

                    {/* Tomato Slices */}
                    <AnimatePresence>
                        {isPasswordFocused && (
                            <>
                                <motion.div
                                    className="absolute left-[32%] top-[37%] w-[16%] h-[16%] rounded-full"
                                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0, rotate: 45 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        background: "radial-gradient(circle, #FF6B6B 60%, #E74C3C 100%)",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    {/* Tomato Seeds */}
                                    <div className="absolute left-[30%] top-[30%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                    <div className="absolute left-[50%] top-[60%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                    <div className="absolute left-[70%] top-[40%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                </motion.div>

                                <motion.div
                                    className="absolute left-[52%] top-[37%] w-[16%] h-[16%] rounded-full"
                                    initial={{ opacity: 0, scale: 0, rotate: 45 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0, rotate: -45 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                    style={{
                                        background: "radial-gradient(circle, #FF6B6B 60%, #E74C3C 100%)",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    {/* Tomato Seeds */}
                                    <div className="absolute left-[40%] top-[20%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                    <div className="absolute left-[60%] top-[50%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                    <div className="absolute left-[30%] top-[70%] w-1 h-1 bg-[#FFEB3B] rounded-full"></div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Kungfu Headband */}
                    <motion.div
                        className="absolute top-[20%] left-0 right-0 h-[15%] bg-red-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 text-2xl font-bold">
                            功夫
                        </div>
                    </motion.div>

                    {/* Mouth */}
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

                {/* Kungfu Pizza Hands */}
                <motion.div
                    className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[25%] bg-[#E2B87F] rounded-full"
                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
                <motion.div
                    className="absolute bottom-[-5%] right-[-5%] w-[25%] h-[25%] bg-[#E2B87F] rounded-full"
                    animate={{ rotate: [0, -15, 0, 15, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                ></motion.div>
            </div>
        </div>
    )
}

