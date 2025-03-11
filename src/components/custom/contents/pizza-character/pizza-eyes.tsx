"use client"

import { motion } from "framer-motion"
import { PizzaBase } from "@/components/custom/contents/pizza-character/pizza-base"
import { PizzaSunglasses } from "@/components/custom/contents/pizza-character/pizza-sunglasses"
import { PizzaMouth } from "@/components/custom/contents/pizza-character/pizza-mouth"

interface PizzaEyesProps {
  isPasswordFocused: boolean
}

export function PizzaEyes({ isPasswordFocused }: PizzaEyesProps) {
  return (
    <div className="relative w-full h-full">
      <PizzaBase />

      {/* Pizza Eyes */}
      <div className="absolute top-1/3 left-0 right-0 flex justify-center space-x-8">
        <motion.div
          className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
          animate={{
            scale: isPasswordFocused ? [1, 0, 0] : 1,
            opacity: isPasswordFocused ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </motion.div>
        <motion.div
          className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
          animate={{
            scale: isPasswordFocused ? [1, 0, 0] : 1,
            opacity: isPasswordFocused ? 0 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-3 h-3 bg-black rounded-full"></div>
        </motion.div>
      </div>

      <PizzaSunglasses isPasswordFocused={isPasswordFocused} />
      <PizzaMouth isPasswordFocused={isPasswordFocused} />
    </div>
  )
}

