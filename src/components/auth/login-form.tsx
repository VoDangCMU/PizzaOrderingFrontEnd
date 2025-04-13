"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PizzaWindow } from "@/components/contents/pizza-window"
import { useRouter } from "next/navigation"
import {loginSuccess} from "@/store/slices/authSlice";
import {useDispatch} from "react-redux";

interface FormErrors {
    username: string;
    password: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export function LoginForm() {
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "", keepLogin: false });
    const [errors, setErrors] = useState<FormErrors>({ username: "", password: "" });
    const dispatch = useDispatch();
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, keepLogin: checked }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrors((prev) => ({ ...prev, [name]: value ? "" : `${name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = { username: "", password: "" };
        let isValid = true;

        if (!formData.username) {
            newErrors.username = "Username is required";
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: formData.username, password: formData.password, keepLogin: formData.keepLogin }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Invalid username or password");
            }

            const data: { username: string; userId: string; token: string } = await response.json();

            dispatch(loginSuccess({
                userId: data.userId,
                username: data.username,
                token: data.token,
                permission : ""
            }));

            localStorage.setItem("token", data.token);
            router.push("../");
        } catch (error) {
            console.error("Login failed:", error);
            setErrors({ username: "Invalid username or password", password: "Invalid username or password" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div className="container max-w-md px-4 z-10" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants}>
                <Card className="kungfu-card border-red-800/30 overflow-hidden">
                    <CardHeader className="space-y-1 text-center">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-3xl font-bold tracking-tight text-red-800">Master Return</CardTitle>
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
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" value={formData.username} onChange={handleInputChange} onBlur={handleBlur} placeholder="example@gmail.com" className={`${errors.username ? "border-red-500" : "border-amber-800/30"} bg-white/50 backdrop-blur-sm focus-visible:ring-red-800`} required />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input placeholder={"************"} id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} onBlur={handleBlur} onFocus={() => setPasswordFocused(true)} className={`${errors.password ? "border-red-500" : "border-amber-800/30"} bg-white/50 backdrop-blur-sm focus-visible:ring-red-800`} required />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="keepLogin" checked={formData.keepLogin} onCheckedChange={handleCheckboxChange} className="data-[state=checked]:bg-red-800 data-[state=checked]:border-red-800" />
                                <label htmlFor="keepLogin" className="text-sm font-medium leading-none">Remember me</label>
                            </div>

                            <Button type="submit" className="w-full bg-red-800 hover:bg-red-700 text-white kungfu-button" disabled={isLoading}>
                                {isLoading ? <><span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span> Signing in...</> : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}
