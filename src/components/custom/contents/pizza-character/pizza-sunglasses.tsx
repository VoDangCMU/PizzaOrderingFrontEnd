"use client"

import { motion, AnimatePresence } from "framer-motion"

interface PizzaSunglassesProps {
  isPasswordFocused: boolean
}

export function PizzaSunglasses({ isPasswordFocused }: PizzaSunglassesProps) {
  return (
    <AnimatePresence>
      {isPasswordFocused && (
        <motion.div
          className="absolute top-1/3 left-0 right-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="relative">
            {/* Sunglasses frame */}
            <div className="absolute w-32 h-8 bg-black rounded-md left-1/2 transform -translate-x-1/2"></div>

            {/* Left lens */}
            <div className="absolute w-10 h-6 bg-gray-800 rounded-full left-1/2 transform -translate-x-[24px] top-1"></div>

            {/* Right lens */}
            <div className="absolute w-10 h-6 bg-gray-800 rounded-full left-1/2 transform translate-x-[4px] top-1"></div>

            {/* Bridge */}
            <div className="absolute w-6 h-1 bg-black rounded-full left-1/2 transform -translate-x-1/2 top-3"></div>

            {/* Temple arms */}
            <div className="absolute w-1 h-6 bg-black rounded-full left-1/2 transform -translate-x-[32px] rotate-30 top-2"></div>
            <div className="absolute w-1 h-6 bg-black rounded-full left-1/2 transform translate-x-[32px] -rotate-30 top-2"></div>

            {/* Shine effect */}
            <div className="absolute w-3 h-1 bg-white/30 rounded-full left-1/2 transform -translate-x-[20px] rotate-45 top-2"></div>
            <div className="absolute w-3 h-1 bg-white/30 rounded-full left-1/2 transform translate-x-[8px] rotate-45 top-2"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

