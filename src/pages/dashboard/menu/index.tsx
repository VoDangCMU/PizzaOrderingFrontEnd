"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Eye, ImageIcon, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { format } from "date-fns"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

interface Size {
    id: string
    size: string
    price: string
    image: string
}

interface Category {
    id: string
    name: string
    description: string
}

interface MenuItem {
    id: string
    name: string
    description: string
    unitPrice: string
    createdAt: string
    sizes: Size[]
    category: Category
    image: string
}

export default function MenuPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])

    const formattedDate = (date: string) => {
        return format(new Date(date), "dd/MM/yyyy")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/pizza/get-all`)
                if (res.status == 200) {
                    setMenuItems(res.data.data)
                }
            } catch (e) {
                console.error("Failed to fetch data", e)
                // Add mock data for testing
                setMenuItems([
                    {
                        id: "1",
                        name: "Dragon's Breath Pizza",
                        description: "Spicy pepperoni, jalapeños, and dragon fruit on our signature crust",
                        unitPrice: "18.99",
                        createdAt: new Date().toISOString(),
                        sizes: [
                            { id: "1", size: "M", price: "18.99", image: "/placeholder.svg" },
                            { id: "2", size: "L", price: "22.99", image: "/placeholder.svg" },
                        ],
                        category: { id: "22", name: "Specialty", description: "Our specialty pizzas" },
                        image: "/placeholder.svg",
                    },
                    {
                        id: "2",
                        name: "Tai Chi Supreme",
                        description: "A balanced harmony of vegetables and cheeses",
                        unitPrice: "16.99",
                        createdAt: new Date().toISOString(),
                        sizes: [
                            { id: "3", size: "S", price: "12.99", image: "/placeholder.svg" },
                            { id: "4", size: "M", price: "16.99", image: "/placeholder.svg" },
                        ],
                        category: { id: "23", name: "Vegetarian", description: "Vegetarian options" },
                        image: "/placeholder.svg",
                    },
                ])
            }
        }
        fetchData()
    }, [])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
                        <p className="text-muted-foreground">Manage your restaurant&#39;s menu items</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                            <Link href="/dashboard/pizza-upload">
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Item
                            </Link>
                        </Button>
                    </div>
                </div>
                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Menu Management</CardTitle>
                            <CardDescription>You have {menuItems.length} menu items in total</CardDescription>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search menu items..."
                                    className="pl-8 w-full sm:w-[240px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Chicken">Specialty</SelectItem>
                                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                                    <SelectItem value="Classic">Classic</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {menuItems.length > 0 ? (
                                    menuItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                                    {item.image ? (
                                                        <Image
                                                            src={`https://pizzas.khoav4.com/${item.name}.png` || "/placeholder.svg"}
                                                            alt={item.name}
                                                            width={40}
                                                            height={40}
                                                            className="h-full w-full object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.unitPrice}</TableCell>
                                            <TableCell>{formattedDate(item.createdAt)}</TableCell>
                                            <TableCell>
                                                {item.sizes.map((s) => (
                                                    <span key={s.id}>{s.size},&#160;</span>
                                                ))}
                                            </TableCell>
                                            <TableCell>{item.category.name}</TableCell>
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
                                                            View details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit item
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete item
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-24 text-center">
                                            No menu items found.
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
