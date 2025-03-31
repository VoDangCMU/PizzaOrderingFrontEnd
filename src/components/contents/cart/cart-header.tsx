import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function CartHeader() {
    const router = useRouter()

    return (
        <div className="mb-8">
            <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/menu")}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Continue Shopping
            </Button>

            <motion.h1
                className="text-3xl md:text-4xl font-bold mb-4 kungfu-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Your Cart
            </motion.h1>

            <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Review your items before proceeding to checkout
            </motion.p>
        </div>
    )
}

