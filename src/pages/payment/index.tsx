"use client"

import type React from "react"
import {useState} from "react"
import {motion} from "framer-motion"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {toast} from "@/components/ui/use-toast"
import {AlertCircle, Check, CreditCard, Plus, Trash2} from "lucide-react"
import LockComponent from "@/components/ui/Lock";

// Types
type CardType = "visa" | "mastercard" | "amex" | "discover" | "generic"

interface SavedCard {
    id: string
    type: CardType
    last4: string
    expiry: string
    name: string
    isDefault: boolean
}

export default function PaymentMethodsPage() {
    const [activeTab, setActiveTab] = useState("cards")
    const [savedCards, setSavedCards] = useState<SavedCard[]>([
        {
            id: "1",
            type: "visa",
            last4: "4242",
            expiry: "04/25",
            name: "John Smith",
            isDefault: true,
        },
    ])

    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: "",
        saveCard: true,
        makeDefault: false,
    })

    const [errors, setErrors] = useState({
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvc: "",
    })

    // Format card number with spaces
    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ""
        const parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(" ")
        } else {
            return value
        }
    }

    // Format expiry date
    const formatExpiry = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

        if (v.length >= 3) {
            return `${v.substring(0, 2)}/${v.substring(2, 4)}`
        }

        return value
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        if (name === "cardNumber") {
            setFormData({...formData, [name]: formatCardNumber(value)})
        } else if (name === "expiry") {
            setFormData({...formData, [name]: formatExpiry(value)})
        } else {
            setFormData({...formData, [name]: value})
        }

        // Clear error when typing
        if (errors[name as keyof typeof errors]) {
            setErrors({...errors, [name]: ""})
        }
    }

    const handleDeleteCard = (id: string) => {
        const updatedCards = savedCards.filter((card) => card.id !== id)

        // If deleted card was default and there are other cards, make the first one default
        if (savedCards.find((card) => card.id === id)?.isDefault && updatedCards.length > 0) {
            updatedCards[0].isDefault = true
        }

        setSavedCards(updatedCards)

        toast({
            title: "Payment method removed",
            description: "Your payment method has been successfully removed.",
        })
    }

    const handleSetDefault = (id: string) => {
        const updatedCards = savedCards.map((card) => ({
            ...card,
            isDefault: card.id === id,
        }))

        setSavedCards(updatedCards)

        toast({
            title: "Default payment method updated",
            description: "Your default payment method has been updated.",
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const newErrors = {
            cardNumber: formData.cardNumber.trim() ? "" : "Card number is required",
            cardName: formData.cardName.trim() ? "" : "Cardholder name is required",
            expiry: formData.expiry.trim() ? "" : "Expiry date is required",
            cvc: formData.cvc.trim() ? "" : "CVC is required",
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) {
            return;
        }

        alert("Form submitted successfully!");
    };
    const getCardType = (cardNumber: string): CardType => {
        const number = cardNumber.replace(/\s+/g, "")

        if (/^4/.test(number)) return "visa"
        if (/^5[1-5]/.test(number)) return "mastercard"
        if (/^3[47]/.test(number)) return "amex"
        if (/^6(?:011|5)/.test(number)) return "discover"

        return "generic"
    }

    return (
        <div className="min-h-screen pt-24 pb-16 bg-kungfu-pattern">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-amber-800/20 z-0"></div>

                <div className="max-w-3xl mx-auto">
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}}>
                        <Card className="kungfu-card border-red-800/30">
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold tracking-tight text-red-800">Payment
                                    Methods</CardTitle>
                                <CardDescription>
                                    Manage your payment methods with the precision of a martial arts master
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2 mb-6">
                                        <TabsTrigger value="cards">Add New Method</TabsTrigger>
                                        <TabsTrigger value="saved">Saved Methods</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="cards">
                                        <form onSubmit={handleSubmit}
                                        >
                                            <div className="space-y-4">
                                                <RadioGroup defaultValue="credit-card" className="mb-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="credit-card" id="credit-card" checked/>
                                                        <Label htmlFor="credit-card"
                                                               className="flex items-center gap-2 cursor-pointer">
                                                            <CreditCard className="h-5 w-5"/>
                                                            Credit/Debit Card
                                                        </Label>
                                                    </div>
                                                </RadioGroup>

                                                <div className="mt-6 space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardNumber">Card Number</Label>
                                                        <div className="relative">
                                                            <Input
                                                                id="cardNumber"
                                                                name="cardNumber"
                                                                placeholder="1234 5678 9012 3456"
                                                                value={formData.cardNumber}
                                                                onChange={handleInputChange}
                                                                maxLength={19}
                                                                className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800 pr-10"
                                                            />
                                                            {getCardType(formData.cardNumber) !== "generic" && (
                                                                <div
                                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                    <Image
                                                                        src={`/${getCardType(formData.cardNumber)}-icon.png`}
                                                                        alt={getCardType(formData.cardNumber)}
                                                                        width={24}
                                                                        height={24}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        {errors.cardNumber && (
                                                            <p className="text-sm text-red-600 flex items-center mt-1">
                                                                <AlertCircle className="h-4 w-4 mr-1"/>
                                                                {errors.cardNumber}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardName">Cardholder Name</Label>
                                                        <Input
                                                            id="cardName"
                                                            name="cardName"
                                                            placeholder="John Smith"
                                                            value={formData.cardName}
                                                            onChange={handleInputChange}
                                                            className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                                        />
                                                        {errors.cardName && (
                                                            <p className="text-sm text-red-600 flex items-center mt-1">
                                                                <AlertCircle className="h-4 w-4 mr-1"/>
                                                                {errors.cardName}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="expiry">Expiry Date</Label>
                                                            <Input
                                                                id="expiry"
                                                                name="expiry"
                                                                placeholder="MM/YY"
                                                                value={formData.expiry}
                                                                onChange={handleInputChange}
                                                                maxLength={5}
                                                                className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                                            />
                                                            {errors.expiry && (
                                                                <p className="text-sm text-red-600 flex items-center mt-1">
                                                                    <AlertCircle className="h-4 w-4 mr-1"/>
                                                                    {errors.expiry}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label htmlFor="cvc">CVC</Label>
                                                            <Input
                                                                id="cvc"
                                                                name="cvc"
                                                                placeholder="123"
                                                                value={formData.cvc}
                                                                onChange={handleInputChange}
                                                                maxLength={4}
                                                                className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                                            />
                                                            {errors.cvc && (
                                                                <p className="text-sm text-red-600 flex items-center mt-1">
                                                                    <AlertCircle className="h-4 w-4 mr-1"/>
                                                                    {errors.cvc}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    type="submit"
                                                    className="w-full bg-red-800 hover:bg-red-700 text-white kungfu-button"
                                                >
                                                    Add payment account
                                                </Button>
                                            </div>
                                        </form>
                                    </TabsContent>

                                    <TabsContent value="saved">
                                        <div className="space-y-6">
                                            {savedCards.length > 0 ? (
                                                <div className="space-y-4">
                                                    {savedCards.map((card) => (
                                                        <div
                                                            key={card.id}
                                                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-amber-800/30 bg-white/50"
                                                        >
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex-shrink-0">
                                                                    <Image src={`/${card.type}-icon.png`}
                                                                           alt={card.type} width={40} height={40}/>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium">
                                                                        •••• •••• •••• {card.last4}
                                                                        {card.isDefault && (
                                                                            <span
                                                                                className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                                          Default
                                        </span>
                                                                        )}
                                                                    </p>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {card.name} • Expires {card.expiry}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                                                                {!card.isDefault && (
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleSetDefault(card.id)}
                                                                        className="text-sm border-amber-800/30 text-amber-900 hover:bg-amber-50"
                                                                    >
                                                                        <Check className="h-4 w-4 mr-1"/>
                                                                        Set Default
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteCard(card.id)}
                                                                    className="text-sm border-red-300 text-red-600 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-1"/>
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <div
                                                        className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                                                        <CreditCard className="h-6 w-6 text-amber-900"/>
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-2">No payment methods
                                                        saved</h3>
                                                    <p className="text-muted-foreground mb-4">Add a payment method to
                                                        make checkout faster</p>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setActiveTab("cards")}
                                                        className="border-red-800 text-red-800 hover:bg-red-50"
                                                    >
                                                        <Plus className="h-4 w-4 mr-2"/>
                                                        Add Payment Method
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>

                            <CardFooter className="flex flex-col border-t border-amber-800/20 pt-6">
                                <div className="text-sm text-muted-foreground">
                                    <p className="flex items-center">
                                        <LockComponent className="h-4 w-4 mr-2 text-amber-900"/>
                                        Your payment information is encrypted and secure
                                    </p>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </div>
    )
}




