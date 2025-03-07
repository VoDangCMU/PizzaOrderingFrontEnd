
import type React from "react"

import { useState } from "react"
import { BanknoteIcon, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
interface PaymentItem{
    subtotal: number,
    shippingFee: number,
    discount: number,
}
export default function PaymentPage({
                            subtotal,
                            shippingFee,
                            discount
                                    }: PaymentItem) {
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        // In a real application, you would process the payment here
    }
    const calculateTotal = () =>{
            if(!subtotal && !discount && !shippingFee ){
                return 0;
            }
        return subtotal * ( 1 - discount) + shippingFee;
    }
    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] p-4">
                <div className="bg-green-100 rounded-full p-3 mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-4 text-center">
                    Thank you for your order. We will process your order as soon as possible.
                </p>
                <Button onClick={() => setIsSubmitted(false)}>Go Back</Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-4 px-4">
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                            <CardDescription>Please select a payment method</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <Input id="fullname" placeholder="John Doe" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" placeholder="0912345678" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="example@gmail.com" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="123 ABC Street, District XYZ, HCMC" required />
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <Label>Payment Method</Label>
                                    <RadioGroup
                                        value={paymentMethod}
                                        onValueChange={setPaymentMethod}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                    >
                                        <div className="rounded-md border-2 border-muted p-4 hover:border-primary transition-colors">
                                            <RadioGroupItem value="cash" id="cash" className="sr-only" />
                                            <Label htmlFor="cash" className="flex flex-col items-center justify-between cursor-pointer">
                                                <BanknoteIcon className="mb-3 h-6 w-6" />
                                                <span className="font-medium">Cash</span>
                                                <span className="text-xs text-gray-500 text-center mt-2">Pay upon delivery</span>
                                            </Label>
                                        </div>

                                        <div className="rounded-md border-2 border-muted p-4 hover:border-primary transition-colors">
                                            <RadioGroupItem value="bank" id="bank" className="sr-only" />
                                            <Label htmlFor="bank" className="flex flex-col items-center justify-between cursor-pointer">
                                                <BanknoteIcon className="mb-3 h-6 w-6" />
                                                <span className="font-medium">Bank Transfer</span>
                                                <span className="text-xs text-gray-500 text-center mt-2">Transfer via bank</span>
                                            </Label>
                                        </div>

                                        <div className="rounded-md border-2 border-muted p-4 hover:border-primary transition-colors">
                                            <RadioGroupItem value="momo" id="momo" className="sr-only" />
                                            <Label htmlFor="momo" className="flex flex-col items-center justify-between cursor-pointer">
                                                <CreditCard className="mb-3 h-6 w-6 text-pink-500" />
                                                <span className="font-medium">MoMo</span>
                                                <span className="text-xs text-gray-500 text-center mt-2">Pay via MoMo wallet</span>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {paymentMethod === "bank" && (
                                    <div className="p-4 bg-gray-50 rounded-md">
                                        <h3 className="font-medium mb-2">Bank Transfer Information:</h3>
                                        <p className="text-sm">Bank: Vietcombank</p>
                                        <p className="text-sm">Account Number: 1234567890</p>
                                        <p className="text-sm">Account Holder: ABC COMPANY</p>
                                        <p className="text-sm mt-2">Content: [Full Name] - [Phone Number]</p>
                                    </div>
                                )}

                                {paymentMethod === "momo" && (
                                    <div className="p-4 bg-gray-50 rounded-md">
                                        <h3 className="font-medium mb-2">MoMo Payment Information:</h3>
                                        <p className="text-sm">Phone Number: 0987654321</p>
                                        <p className="text-sm">Account Name: ABC COMPANY</p>
                                        <p className="text-sm mt-2">Content: [Full Name] - [Phone Number]</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">
                                    Confirm Payment
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping Fee</span>
                                    <span>{shippingFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span>{discount}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span> {calculateTotal()}₫</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
