"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PizzaWindow } from "@/components/contents/pizza-window"
import { useRouter } from "next/router"
import { toast } from "@/components/ui/use-toast"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function RegisterForm() {
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        dateOfBirth: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
    })

    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const success = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((res) => {
                if (res.ok) {
                    return true
                } else {
                    throw new Error("Registration failed")
                }
            })

            if (success) {
                toast({
                    title: "Registration successful",
                    description: "Welcome to Võ Đang Pizza!",
                })
                router.push("../auth/login")
            } else {
                toast({
                    title: "Registration failed",
                    description: "An error occurred during registration. Please try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.log("Registration failed:", error)
            toast({
                title: "Registration failed",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            className="container max-w-2xl px-4 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Card className="kungfu-card border-red-800/30 overflow-hidden">
                    <CardHeader className="space-y-1 text-center">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-3xl font-bold tracking-tight text-red-800">Join the Disciples</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription>Create your account to begin your pizza journey</CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <motion.div className="relative mx-auto w-64 h-64 mb-6" variants={itemVariants}>
                            <PizzaWindow isPasswordFocused={passwordFocused} />
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="John"
                                        className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                        required
                                    />
                                </motion.div>
                                <motion.div className="space-y-2" variants={itemVariants}>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Doe"
                                        className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                        required
                                    />
                                </motion.div>
                            </div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="kungfu_master"
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                <Input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (123) 456-7890"
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div className="space-y-2" variants={itemVariants}>
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Kungfu Street, Pizza City"
                                    className="bg-white/50 backdrop-blur-sm border-amber-800/30 focus-visible:ring-red-800"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="w-full bg-red-800 hover:bg-red-700 text-white kungfu-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter>
                        <motion.div className="text-sm text-center w-full text-muted-foreground" variants={itemVariants}>
                            Already have an account?{" "}
                            <Link href="../auth/login" className="underline underline-offset-4 hover:text-red-800">
                                Sign in
                            </Link>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    )
}

