import { motion } from "framer-motion"
import { CartItem } from "./cart-item"
import type { CartItem as CartItemType } from "@/hooks/use-cart"

interface CartItemListProps {
    items: CartItemType[]
}

export function CartItemList({ items }: CartItemListProps) {
    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {items.map((item, index) => (
                <CartItem key={item.id} item={item} delay={index * 0.1} />
            ))}
        </motion.div>
    )
}

