import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface PromoCodeInputProps {
    onPromoApplied: (discount: number) => void
}

// Mock promo codes
const PROMO_CODES = {
    KUNGFU10: 10,
    PIZZA20: 5,
    WELCOME15: 15,
}

export function PromoCodeInput({ onPromoApplied }: PromoCodeInputProps) {
    const [promoCode, setPromoCode] = useState("")
    const [isApplying, setIsApplying] = useState(false)
    const [isApplied, setIsApplied] = useState(false)

    const handleApplyPromo = () => {
        if (!promoCode.trim()) return

        setIsApplying(true)

        // Simulate API call
        setTimeout(() => {
            const normalizedCode = promoCode.trim().toUpperCase()
            const discount = PROMO_CODES[normalizedCode as keyof typeof PROMO_CODES]

            if (discount) {
                onPromoApplied(discount)
                setIsApplied(true)
            } else {
                toast({
                    title: "Invalid promo code",
                    description: "The promo code you entered is invalid or expired.",
                    variant: "destructive",
                })
            }

            setIsApplying(false)
        }, 1000)
    }

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium">Promo Code</p>
            <div className="flex gap-2">
                <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={isApplied || isApplying}
                    className="flex-1"
                />
                <Button onClick={handleApplyPromo} disabled={isApplied || isApplying || !promoCode.trim()} variant="outline">
                    {isApplying ? "Applying..." : isApplied ? "Applied" : "Apply"}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">Try codes: KUNGFU10, PIZZA20, WELCOME15</p>
        </div>
    )
}

