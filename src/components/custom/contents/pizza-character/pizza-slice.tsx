"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PizzaSliceProps {
  isPasswordFocused: boolean
}

export function PizzaSlice({ isPasswordFocused }: PizzaSliceProps) {
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
      {/* Pizza Slice Base */}
      <div className="absolute inset-0">
        {/* Pizza Triangle Shape */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="w-full h-full bg-pizza-crust"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Crust Edge */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#E2B87F] rounded-b-lg"
              style={{
                background: "linear-gradient(to bottom, #E2B87F 0%, #C69C6D 100%)",
              }}
            >
              {/* Crust Texture */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-[10%] top-[20%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
                <div className="absolute left-[25%] top-[40%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
                <div className="absolute left-[40%] top-[30%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
                <div className="absolute left-[60%] top-[50%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
                <div className="absolute left-[75%] top-[20%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
                <div className="absolute left-[90%] top-[40%] w-1 h-1 rounded-full bg-[#A67C52]"></div>
              </div>
            </div>

            {/* Sauce Layer */}
            <div
              className="absolute inset-0 bg-pizza-sauce"
              style={{
                clipPath: "polygon(50% 5%, 97% 97%, 3% 97%)",
                background: "linear-gradient(to bottom, #D62828 0%, #B51A1A 100%)",
              }}
            >
              {/* Sauce Texture */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-[20%] top-[30%] w-2 h-2 rounded-full bg-[#9E2A2B]"></div>
                <div className="absolute left-[50%] top-[40%] w-3 h-3 rounded-full bg-[#9E2A2B]"></div>
                <div className="absolute left-[70%] top-[20%] w-2 h-2 rounded-full bg-[#9E2A2B]"></div>
              </div>
            </div>

            {/* Cheese Layer */}
            <div
              className="absolute inset-0 bg-pizza-cheese"
              style={{
                clipPath: "polygon(50% 10%, 94% 94%, 6% 94%)",
                background: "linear-gradient(to bottom, #F9DC5C 0%, #E8CB4A 100%)",
              }}
            >
              {/* Cheese Texture */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-[15%] top-[25%] w-2 h-2 rounded-full bg-[#F0C61F]"></div>
                <div className="absolute left-[35%] top-[45%] w-3 h-3 rounded-full bg-[#F0C61F]"></div>
                <div className="absolute left-[55%] top-[35%] w-2 h-2 rounded-full bg-[#F0C61F]"></div>
                <div className="absolute left-[75%] top-[55%] w-2 h-2 rounded-full bg-[#F0C61F]"></div>
              </div>
            </div>

            {/* Pepperoni Slices */}
            <motion.div
              className="absolute left-[25%] top-[30%] w-[15%] h-[15%] bg-pizza-pepperoni rounded-full"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              style={{
                background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
              }}
            ></motion.div>

            <motion.div
              className="absolute left-[60%] top-[25%] w-[18%] h-[18%] bg-pizza-pepperoni rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
              style={{
                background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
              }}
            ></motion.div>

            <motion.div
              className="absolute left-[40%] top-[55%] w-[16%] h-[16%] bg-pizza-pepperoni rounded-full"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              style={{
                background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
              }}
            ></motion.div>

            <motion.div
              className="absolute left-[70%] top-[60%] w-[14%] h-[14%] bg-pizza-pepperoni rounded-full"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
              style={{
                background: "radial-gradient(circle, #D62828 0%, #9E2A2B 100%)",
                boxShadow: "0 2px 3px rgba(0, 0, 0, 0.2)",
              }}
            ></motion.div>
          </div>
        </div>
      </div>

      {/* Pizza Face */}
      <div className="absolute inset-0 z-10">
        {/* Eyes */}
        <div className="absolute left-[35%] top-[40%] w-[10%] h-[10%] bg-white rounded-full flex items-center justify-center">
          <motion.div
            className="w-[60%] h-[60%] bg-black rounded-full"
            animate={{ x: isPasswordFocused ? 0 : eyePosition.x, y: isPasswordFocused ? 0 : eyePosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
          ></motion.div>
        </div>

        <div className="absolute left-[55%] top-[40%] w-[10%] h-[10%] bg-white rounded-full flex items-center justify-center">
          <motion.div
            className="w-[60%] h-[60%] bg-black rounded-full"
            animate={{ x: isPasswordFocused ? 0 : eyePosition.x, y: isPasswordFocused ? 0 : eyePosition.y }}
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
          ></motion.div>
        </div>

        {/* Tomato Slices for Eyes */}
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
    </div>
  )
}

