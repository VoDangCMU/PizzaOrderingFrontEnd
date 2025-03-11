"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    image?: string
}

interface RegisterData {
    username: string
    password: string
    dateOfBirth: string
    firstName: string
    lastName: string
    phone: string
    email: string
    address: string
}

interface AuthContextType {
    isLoggedIn: boolean
    user: User | null
    login: (username: string, password: string, keepLogin : boolean) => Promise<boolean>
    register: (data: RegisterData) => Promise<boolean>
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    user: null,
    login: async () => false,
    register: async () => false,
    logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    // Check if user is logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsLoggedIn(true)
        }
    }, [])

    const login = async (username: string, password: string, keepLogin: boolean) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, keepLogin }),
            });

            if (!response.ok) {
                throw new Error("An error occurred while logging in");
            }

            const responseBody = await response.json();

            if (responseBody && responseBody.user) {
                setUser(responseBody.user);
                setIsLoggedIn(true);
                localStorage.setItem("user", JSON.stringify(responseBody.user));
                return true;
            } else {
                throw new Error("Invalid response body");
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };


    const register = async (data: RegisterData) => {
        try {

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("An error occurred while registering")
            }
            return true
        } catch (error) {
            console.error("Registration failed:", error)
            return false
        }
    }

    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("user")
    }

    return <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

