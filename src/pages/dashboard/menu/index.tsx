"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Plus, Edit, Trash2, Eye, ImageIcon } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Filter menu items based on search query and category filter
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Menu Items</h2>
              <p className="text-muted-foreground">Manage your restaurant's menu items</p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4"/>
                Add New Item
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Menu Management</CardTitle>
                <CardDescription>You have {filteredItems.length} menu items in total</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
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
                    <SelectValue placeholder="Filter by category"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Specialty">Specialty</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Classic">Classic</SelectItem>
                    <SelectItem value="Signature">Signature</SelectItem>
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
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length > 0 ? (
                      filteredItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                {item.image ? (
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="h-full w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <ImageIcon className="h-5 w-5 text-muted-foreground"/>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-muted/50">
                                {item.category}
                              </Badge>
                            </TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch id={`status-${item.id}`} checked={item.active}/>
                                <Label htmlFor={`status-${item.id}`} className="text-sm">
                                  {item.active ? "Active" : "Inactive"}
                                </Label>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4"/>
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4"/>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4"/>
                                    Edit item
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Delete item
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
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

// Sample data
const menuItems = [
  {
    id: 1,
    name: "Dragon's Breath",
    description:
        "Spicy pepperoni, jalapeños, and dragon fruit on our signature crust, finished with a fiery sauce that brings the heat of a dragon's breath.",
    price: 18.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Specialty",
    active: true,
  },
  {
    id: 2,
    name: "Tai Chi Supreme",
    description:
        "A balanced harmony of vegetables and cheeses, representing the yin and yang of flavors. Perfect for those seeking balance in their meal.",
    price: 16.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetarian",
    active: true,
  },
  {
    id: 3,
    name: "Wudang Master",
    description:
        "Our signature pizza with five secret ingredients, passed down through generations of pizza masters. A true taste of tradition.",
    price: 21.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Signature",
    active: true,
  },
  {
    id: 4,
    name: "Shaolin Veggie",
    description:
        "A meditative blend of fresh vegetables, mushrooms, and herbs on a thin, crispy crust. Enlightenment in every bite.",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetarian",
    active: true,
  },
  {
    id: 5,
    name: "Kung Fu Chicken",
    description:
        "Grilled chicken, bell peppers, and onions with our special kung fu sauce. A powerful combination of flavors.",
    price: 17.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Meat",
    active: true,
  },
  {
    id: 6,
    name: "Monk's Meditation",
    description:
        "A simple yet profound combination of fresh tomatoes, basil, and mozzarella on our handcrafted crust. Simplicity is the ultimate sophistication.",
    price: 14.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Classic",
    active: false,
  },
  {
    id: 7,
    name: "Five Elements",
    description:
        "Five distinct sections representing water, fire, earth, metal, and wood, each with unique toppings and flavors.",
    price: 23.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Specialty",
    active: true,
  },
  {
    id: 8,
    name: "Warrior's Feast",
    description: "Loaded with pepperoni, sausage, ham, bacon, and beef. A protein-packed pizza for the true warrior.",
    price: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Meat",
    active: true,
  },
]

