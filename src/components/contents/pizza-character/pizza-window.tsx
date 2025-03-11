
"use client"

import { useState, useEffect, useRef } from "react"
import { PizzaBase } from "./pizza-base"
import { PizzaFace } from "./pizza-face"

interface PizzaWindowProps {
    isPasswordFocused: boolean
}

export function PizzaWindow({ isPasswordFocused }: PizzaWindowProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const pizzaRef = useRef<HTMLDivElement>(null)
    const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (pizzaRef.current) {
                const pizzaRect = pizzaRef.current.getBoundingClientRect()
                const pizzaCenterX = pizzaRect.left + pizzaRect.width / 2
                const pizzaCenterY = pizzaRect.top + pizzaRect.height / 2
                const mouseX = e.clientX - pizzaCenterX
                const mouseY = e.clientY - pizzaCenterY
                setMousePosition({ x: mouseX, y: mouseY })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (!isPasswordFocused) {
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
            </div>
            {/* Pizza Character (Round Pizza) */}
            <div className="absolute inset-0 z-10">
                <PizzaBase />
                <PizzaFace isPasswordFocused={isPasswordFocused} eyePosition={eyePosition} />
            </div>
        </div>
    )
}

