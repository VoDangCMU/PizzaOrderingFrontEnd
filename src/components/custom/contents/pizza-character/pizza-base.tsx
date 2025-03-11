"use client"

import { motion } from "framer-motion"

export function PizzaBase() {
  return (
    <motion.div
      className="absolute inset-0 bg-amber-600 rounded-full border-4 border-amber-800"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
    >
      {/* Pepperoni spots */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-600 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-red-600 rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-red-600 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-red-600 rounded-full"></div>
    </motion.div>
  )
}

