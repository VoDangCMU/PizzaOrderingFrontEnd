"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PizzaWindow } from "@/components/contents/pizza-window"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

// Animation variants
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

export function LoginForm() {
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        keepLogin: false,
    })

    const { login } = useAuth()
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            keepLogin: checked,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const success = await login(formData.username, formData.password)

            if (success) {
                toast({
                    title: "Login successful",
                    description: "Welcome back to Võ Đang Pizza!",
                })
                router.push("/")
            } else {
                toast({
                    title: "Login failed",
                    description: "Invalid username or password. Please try again.",
                    variant: "destructive",
                })
            }
        } catch (error ) {
            console.error("Login failed:", error)
            toast({
                title: "Login failed",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            className="container max-w-md px-4 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <Card className="kungfu-card border-red-800/30 overflow-hidden">
                    <CardHeader className="space-y-1 text-center">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-3xl font-bold tracking-tight text-red-800">Master  Return</CardTitle>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <CardDescription>Enter your credentials to access your account</CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <motion.div className="relative mx-auto w-48 h-48 mb-6" variants={itemVariants}>
                            <PizzaWindow isPasswordFocused={passwordFocused} />
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-4">
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

                            <motion.div className="flex items-center space-x-2" variants={itemVariants}>
                                <Checkbox
                                    id="keepLogin"
                                    checked={formData.keepLogin}
                                    onCheckedChange={handleCheckboxChange}
                                    className="data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800"
                                />
                                <label
                                    htmlFor="keepLogin"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
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
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-2">
                        <motion.div className="text-sm text-center text-muted-foreground" variants={itemVariants}>
                            <Link href="/forgot-password" className="underline underline-offset-4 hover:text-red-800">
                                Forgot your password?
                            </Link>
                        </motion.div>

                        <motion.div className="text-sm text-center text-muted-foreground" variants={itemVariants}>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="underline underline-offset-4 hover:text-red-800">
                                Sign up
                            </Link>
                        </motion.div>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    )
}

