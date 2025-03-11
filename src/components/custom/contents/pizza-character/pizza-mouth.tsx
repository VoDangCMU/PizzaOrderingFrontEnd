"use client"

import { motion } from "framer-motion"

interface PizzaMouthProps {
  isPasswordFocused: boolean
}

export function PizzaMouth({ isPasswordFocused }: PizzaMouthProps) {
  return (
    <motion.div
      className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-black rounded-full"
      animate={{
        scaleX: isPasswordFocused ? 1.2 : 1,
        y: isPasswordFocused ? 5 : 0,
        rotate: isPasswordFocused ? -10 : 0,
      }}
      transition={{ duration: 0.3 }}
    ></motion.div>
  )
}

