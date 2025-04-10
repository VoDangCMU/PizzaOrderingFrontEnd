"use client"

import type React from "react"

import { useRouter } from "next/router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {LayoutDashboard, ShoppingBag, Pizza, Users, BarChart3, Settings, LogOut, Bell, Search, Leaf} from "lucide-react"
import NavItem from "@/components/dashboard/NavItem";

type DashboardLayoutProps = {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter()
    const currentPath = router.pathname

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0">
                <div className="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 overflow-y-auto">
                    <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-200 dark:border-gray-800">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            VP
                        </div>
                        <div className="font-bold text-lg">Võ Đang Admin</div>
                    </div>
                    <nav className="flex-1 px-2 py-4 space-y-6 ">
                        <div>
                            <div className="pl-2.5">
                                <span className="text-sm ">Main</span>
                            </div>

                            <NavItem
                                href="/dashboard"
                                icon={<LayoutDashboard className="mr-3 h-5 w-5" />}
                                text="Dashboard"
                                active={currentPath === "/dashboard"}
                            />
                            <NavItem
                                href="/dashboard/orders"
                                icon={<ShoppingBag className="mr-3 h-5 w-5" />}
                                text="Orders"
                                active={currentPath === "/dashboard/orders"}
                            />
                        </div>

                        <div>
                            <div className="pl-2.5">
                                <span className="text-sm ">Menu management</span>
                            </div>
                            <NavItem
                                href="/dashboard/menu"
                                icon={<Pizza className="mr-3 h-5 w-5"/>}
                                text="Menu Items"
                                active={currentPath === "/dashboard/menu"}
                            />
                            <NavItem href={"/dashboard/ingredients"}
                                     icon={<Leaf className="mr-3 h-5 w-5"/> }
                                     text={"Ingredients"}
                                     active={currentPath === "/dashboard/ingredients"}
                            />
                        </div>

                        <div>
                            <div className="pl-2.5">
                                <span className="text-sm ">Users</span>
                            </div>
                            <NavItem
                                href="/dashboard/customers"
                                icon={<Users className="mr-3 h-5 w-5"/>}
                                text="Customers"
                                active={currentPath === "/dashboard/customers"}
                            />
                        </div>
                        <div>
                            <div className="pl-2.5">
                                <span className="text-sm ">Settings</span>
                            </div>
                            <NavItem
                                href="/dashboard/settings"
                                icon={<Settings className="mr-3 h-5 w-5"/>}
                                text="Settings"
                                active={currentPath === "/dashboard/settings"}
                            />
                        </div>

                    </nav>
                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" alt="Admin User" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium leading-none">Master Wong</p>
                                <p className="text-xs text-muted-foreground truncate">admin@vodangpizza.com</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-muted-foreground">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-6">
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold">
                            {currentPath === "/dashboard" && "Dashboard"}
                            {currentPath === "/dashboard/orders" && "Orders"}
                            {currentPath === "/dashboard/menu" && "Menu Items"}
                            {currentPath === "/dashboard/customers" && "Customers"}
                            {currentPath === "/dashboard/analytics" && "Analytics"}
                            {currentPath === "/dashboard/settings" && "Settings"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative w-60">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full bg-background pl-8 md:w-[240px] lg:w-[280px]"
                            />
                        </div>

                        <Button variant="outline" size="icon" className="relative">
                            <Bell className="h-4 w-4" />
                            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-white">
                                3
                            </Badge>
                        </Button>
                    </div>
                </header>
                <main className="p-6 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">{children}</main>
            </div>
        </div>
    )
}


