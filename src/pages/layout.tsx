import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"
import { CartProvider } from "@/hooks/use-cart"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layouts/header"
import Footer from "@/components/layouts/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Võ Đang Pizza - Modern Martial Arts Pizza",
    description: "Experience the harmony of ancient martial arts and modern pizza crafting",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
            <AuthProvider>
                <CartProvider>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <div className="flex-1 pt-16">{children}</div>
                        <Footer />
                    </div>
                    <Toaster />
                </CartProvider>
            </AuthProvider>
        </body>
        </html>
    )
}

