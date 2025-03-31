import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"

export function EmptyCart() {
    return (
        <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-md mx-auto">
                <motion.div
                    className="bg-muted rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </motion.div>
                <motion.h2
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    Your cart is empty
                </motion.h2>
                <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Looks like you haven't added any pizzas to your cart yet.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Button asChild size="lg" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                        <Link href="/menu">Browse Menu</Link>
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}

