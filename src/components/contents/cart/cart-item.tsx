import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { CartItem as CartItemType } from "@/hooks/use-cart"
import Image from "next/image";

interface CartItemProps {
    item: CartItemType
    delay?: number
}

export function CartItem({ item, delay = 0 }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart()
    const unitPrice = Number.parseFloat(item.pizza.unitPrice)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + delay }}
        >
            <Card className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/4 aspect-square">
                        <Image
                            src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(item.pizza.name)}`}
                            alt={item.pizza.name}
                            className="w-full h-full object-cover"
                            width={"200"}
                            height={"200"}
                        />
                    </div>
                    <div className="flex-1 p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                                <h3 className="text-xl font-bold">{item.pizza.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.pizza.description}</p>
                                {item.note && <p className="text-sm text-muted-foreground mt-2 italic">Note: {item.note}</p>}
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                                <p className="text-lg font-bold text-primary">${(unitPrice * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">${unitPrice.toFixed(2)} each</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.pizza.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.pizza.id, item.quantity + 1)}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.pizza.id)}
                            >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    )
}
