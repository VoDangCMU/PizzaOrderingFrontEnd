import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, ShoppingBag } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { PromoCodeInput } from "./promo-code-input"

export function CartSummary() {
    const { totalPrice, clearCart } = useCart()
    const router = useRouter()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [discount, setDiscount] = useState(0)

    const subtotal = totalPrice
    const deliveryFee = 3.99
    const tax = subtotal * 0.08
    const total = subtotal + deliveryFee + tax - discount

    const handleCheckout = async () => {
        setIsCheckingOut(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            toast({
                title: "Order placed successfully!",
                description: "Your delicious pizza is on its way to you.",
            })

            clearCart()
            router.push("/")
        } catch (error) {
            console.error("Checkout failed:", error)
            toast({
                title: "Checkout failed",
                description: "There was an error processing your order. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsCheckingOut(false)
        }
    }

    const handlePromoApplied = (amount: number) => {
        setDiscount(amount)
        toast({
            title: "Promo code applied!",
            description: `You saved $${amount.toFixed(2)} on your order.`,
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>

                    {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>-${discount.toFixed(2)}</span>
                        </div>
                    )}

                    <PromoCodeInput onPromoApplied={handlePromoApplied} />

                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button"
                        size="lg"
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                    >
                        {isCheckingOut ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-5 w-5 mr-2" />
                                Checkout
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <div className="mt-6 text-center text-sm text-muted-foreground">
                <p className="flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Secure Checkout
                </p>
                <p className="mt-2">Free delivery for orders over $30</p>
            </div>
        </motion.div>
    )
}

