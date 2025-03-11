"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface DetailedPizzaProps {
  isPasswordFocused: boolean
}

export function DetailedPizza({ isPasswordFocused }: DetailedPizzaProps) {
  const [rotation, setRotation] = useState(0)

  // Random rotation for pizza
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(Math.random() * 10 - 5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Pizza Base with 3D effect */}
      <motion.div
        className="absolute inset-0 rounded-full shadow-lg overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{
          scale: [0.95, 1, 0.95],
          rotate: rotation,
        }}
        transition={{
          scale: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          },
          rotate: {
            duration: 2,
          },
        }}
      >
        {/* Crust */}
        <div className="absolute inset-0 bg-pizza-crust rounded-full border-[6px] border-[#D4A76A]">
          {/* Crust texture */}
          <div className="absolute inset-[3px] rounded-full border-2 border-[#C69C6D]/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,#C69C6D_100%)]"></div>
        </div>

        {/* Sauce layer */}
        <div className="absolute inset-[10px] bg-pizza-sauce rounded-full">
          {/* Sauce texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#D62828_30%,#B51A1A_100%)]"></div>
        </div>

        {/* Cheese layer */}
        <div className="absolute inset-[15px] bg-pizza-cheese rounded-full">
          {/* Cheese texture - small holes and bubbles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#E8CB4A] rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#E8CB4A] rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#E8CB4A] rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#E8CB4A] rounded-full"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#F9DC5C_30%,#E8CB4A_100%)]"></div>
        </div>

        {/* Pepperoni slices with 3D effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-8 h-8 bg-pizza-pepperoni rounded-full shadow-md"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-[2px] rounded-full bg-[#8B1E1F]"></div>
          <div className="absolute inset-[4px] rounded-full border border-black/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#9E2A2B_30%,#8B1E1F_100%)]"></div>
        </motion.div>

        <motion.div
          className="absolute top-1/5 right-1/4 w-10 h-10 bg-pizza-pepperoni rounded-full shadow-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        >
          <div className="absolute inset-[2px] rounded-full bg-[#8B1E1F]"></div>
          <div className="absolute inset-[4px] rounded-full border border-black/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#9E2A2B_30%,#8B1E1F_100%)]"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-9 h-9 bg-pizza-pepperoni rounded-full shadow-md"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <div className="absolute inset-[2px] rounded-full bg-[#8B1E1F]"></div>
          <div className="absolute inset-[4px] rounded-full border border-black/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#9E2A2B_30%,#8B1E1F_100%)]"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-7 h-7 bg-pizza-pepperoni rounded-full shadow-md"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
        >
          <div className="absolute inset-[2px] rounded-full bg-[#8B1E1F]"></div>
          <div className="absolute inset-[4px] rounded-full border border-black/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#9E2A2B_30%,#8B1E1F_100%)]"></div>
        </motion.div>

        {/* Basil leaves */}
        <motion.div
          className="absolute top-2/5 left-2/5 w-6 h-6"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-full h-full bg-green-600 rounded-full transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
        </motion.div>

        <motion.div
          className="absolute bottom-2/5 right-2/5 w-5 h-5"
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <div className="w-full h-full bg-green-600 rounded-full transform rotate-20"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-700 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-20"></div>
        </motion.div>
      </motion.div>

      {/* Pizza Face */}
      <div className="absolute top-1/3 left-0 right-0 flex justify-center space-x-8 z-10">
        {/* Eyes */}
        <motion.div
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
          animate={{
            scale: isPasswordFocused ? [1, 0, 0] : 1,
            opacity: isPasswordFocused ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-4 h-4 bg-black rounded-full"
            animate={{
              y: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          ></motion.div>
        </motion.div>

        <motion.div
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
          animate={{
            scale: isPasswordFocused ? [1, 0, 0] : 1,
            opacity: isPasswordFocused ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-4 h-4 bg-black rounded-full"
            animate={{
              y: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              delay: 0.1,
            }}
          ></motion.div>
        </motion.div>
      </div>

      {/* Sunglasses */}
      <motion.div
        className="absolute top-1/3 left-0 right-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isPasswordFocused ? 1 : 0,
          y: isPasswordFocused ? 0 : 10,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative">
          {/* Sunglasses frame with gradient */}
          <div className="absolute w-36 h-10 bg-gradient-to-r from-gray-900 to-gray-700 rounded-md left-1/2 transform -translate-x-1/2 shadow-lg"></div>

          {/* Left lens with reflection */}
          <div className="absolute w-12 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full left-1/2 transform -translate-x-[28px] top-1 shadow-inner overflow-hidden">
            <div className="absolute top-1 left-1 w-4 h-1 bg-white/30 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-2 right-2 w-3 h-1 bg-white/20 rounded-full transform rotate-45"></div>
          </div>

          {/* Right lens with reflection */}
          <div className="absolute w-12 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full left-1/2 transform translate-x-[4px] top-1 shadow-inner overflow-hidden">
            <div className="absolute top-1 left-1 w-4 h-1 bg-white/30 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-2 right-2 w-3 h-1 bg-white/20 rounded-full transform rotate-45"></div>
          </div>

          {/* Bridge with metallic effect */}
          <div className="absolute w-8 h-2 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full left-1/2 transform -translate-x-1/2 top-3"></div>

          {/* Temple arms with metallic effect */}
          <div className="absolute w-2 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full left-1/2 transform -translate-x-[36px] rotate-30 top-2"></div>
          <div className="absolute w-2 h-8 bg-gradient-to-l from-gray-700 to-gray-900 rounded-full left-1/2 transform translate-x-[36px] -rotate-30 top-2"></div>
        </div>
      </motion.div>

      {/* Mouth with more expression */}
      <motion.div
        className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          width: isPasswordFocused ? "20px" : "16px",
          height: isPasswordFocused ? "16px" : "2px",
          y: isPasswordFocused ? 5 : 0,
          rotate: isPasswordFocused ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isPasswordFocused ? (
          // Smiling mouth when password is focused
          <div className="bg-black rounded-full w-full h-full flex items-center justify-center">
            <div className="bg-[#8B1E1F] rounded-full w-[80%] h-[80%]"></div>
          </div>
        ) : (
          // Normal mouth
          <div className="bg-black rounded-full w-full h-full"></div>
        )}
      </motion.div>
    </div>
  )
}

