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
    login: (username: string, password: string) => Promise<boolean>
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

    // Mock login function
    const login = async (username: string, password: string) => {
        // In a real app, this would make an API call
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, any username/password combination works
            const mockUser: User = {
                id: "user-1",
                username: username,
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                image: "/kungfu-user-avatar.png",
            }

            setUser(mockUser)
            setIsLoggedIn(true)
            localStorage.setItem("user", JSON.stringify(mockUser))
            return true
        } catch (error) {
            console.error("Login failed:", error)
            return false
        }
    }

    // Mock register function
    const register = async (data: RegisterData) => {
        // In a real app, this would make an API call
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, any registration works
            const mockUser: User = {
                id: "user-1",
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                image: "/kungfu-user-avatar.png",
            }

            setUser(mockUser)
            setIsLoggedIn(true)
            localStorage.setItem("user", JSON.stringify(mockUser))
            return true
        } catch (error) {
            console.error("Registration failed:", error)
            return false
        }
    }

    // Logout function
    const logout = () => {
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem("user")
    }

    return <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

