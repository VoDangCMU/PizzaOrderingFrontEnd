"use client"

import { useEffect, useRef } from "react"
import HeroSection from "@/components/layouts/hero"
import FeaturedPizzas from "@/components/contents/featured-pizzas"
import MartialArtsValues from "@/components/contents/martial-arts-values"
import { ChatAssistant } from "@/components/layouts/chat-assistant"
import { motion, useInView } from "framer-motion"

export default function Home() {
    const featuredRef = useRef(null)
    const valuesRef = useRef(null)
    const ctaRef = useRef(null)

    const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 })
    const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 })
    const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })


    useEffect(() => {
        const animateElements = document.querySelectorAll(".animate-on-scroll")
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                    }
                })
            },
            { threshold: 0.1 },
        )

        animateElements.forEach((el) => observer.observe(el))

        return () => {
            animateElements.forEach((el) => observer.unobserve(el))
        }
    }, [])

    return (
        <main className="min-h-screen">
            <HeroSection />

            <div id="content-section" className="pt-16">
                <motion.div
                    ref={featuredRef}
                    style={{
                        opacity: featuredInView ? 1 : 0,
                        transform: featuredInView ? "translateY(0)" : "translateY(50px)",
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
                    }}
                >
                    <FeaturedPizzas />
                </motion.div>

                <motion.div
                    ref={valuesRef}
                    style={{
                        opacity: valuesInView ? 1 : 0,
                        transform: valuesInView ? "translateY(0)" : "translateY(50px)",
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
                    }}
                >
                    <MartialArtsValues />
                </motion.div>

                <motion.div
                    ref={ctaRef}
                    style={{
                        opacity: ctaInView ? 1 : 0,
                        transform: ctaInView ? "translateY(0)" : "translateY(50px)",
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
                    }}
                >
                    <section className="container py-16 text-center">
                        <div className="max-w-3xl mx-auto p-8 glassmorphism rounded-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Join Our Martial Arts Pizza Journey</h2>
                            <p className="text-lg mb-8 text-foreground/80">
                                Become a disciple of the ancient art of pizza crafting. Register now to unlock exclusive offers and
                                secret recipes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.a
                                    href="../auth/login"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 btn-hover"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.a>
                                <motion.a
                                    href="../auth/register"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 btn-hover"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Register
                                </motion.a>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>

            <ChatAssistant />
        </main>
    )
}

