"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter, Download, Eye, Mail, Phone, ShoppingBag } from "lucide-react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"

interface User {
    id: number
    username: string
    dateOfBirth: string
    lastName: string
    firstName: string
    phone: string
    email: string
    address: string
    avatar: string
    role: string
    createdAt: string
}

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [customers, setCustomers] = useState<User[]>([])

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/user/get-all`, {
                method: "GET",
                headers:{
                    Authorization: `${token}`
                }
            });
            const data = await res.json();
            console.log(data.data);
            if (Array.isArray(data.data)) {
                setCustomers(data.data);
            } else {
                console.warn("data.data is not an array", data);
                setCustomers([]);
            }

        } catch (err) {
            console.error("Error fetching customers:", err);
            setCustomers([]);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                        <p className="text-muted-foreground">Manage your customer database</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Customer Management</CardTitle>
                            <CardDescription>
                            </CardDescription>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search customers..."
                                className="pl-8 w-full sm:w-[300px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {/*<Avatar className="h-9 w-9">*/}
                                                    {/*    <AvatarImage src={customer.avatar || "/placeholder-user.jpg"} />*/}
                                                    {/*    <AvatarFallback>*/}
                                                    {/*        {customer.firstName[0]}{customer.lastName[0]}*/}
                                                    {/*    </AvatarFallback>*/}
                                                    {/*</Avatar>*/}
                                                    <div>
                                                        <div className="font-medium">
                                                            {customer.firstName} {customer.lastName}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            Customer since {new Date(customer.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center text-sm">
                                                        <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center text-sm">
                                                        <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                                    {/* Optional: You can show number of orders here if you have it */}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {/* Optional: You can show totalSpent here if you have it */}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View profile
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            Send email
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <ShoppingBag className="mr-2 h-4 w-4" />
                                                            View orders
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No customers found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}
