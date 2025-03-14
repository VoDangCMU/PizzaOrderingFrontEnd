"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter, Download, Eye, Mail, Phone, Star, StarOff, ShoppingBag } from "lucide-react"
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

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
                <Filter className="mr-2 h-4 w-4"/>
                Filter
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4"/>
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>You have {filteredCustomers.length} customers in total</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
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
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={customer.avatar} alt={customer.name}/>
                                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">Customer
                                    since {customer.joinDate}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center text-sm">
                                  <Mail className="mr-2 h-3 w-3 text-muted-foreground"/>
                                  {customer.email}
                                </div>
                                <div className="flex items-center text-sm">
                                  <Phone className="mr-2 h-3 w-3 text-muted-foreground"/>
                                  {customer.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <ShoppingBag className="h-4 w-4 text-muted-foreground"/>
                                {customer.orders}
                              </div>
                            </TableCell>
                            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                            <TableCell>
                              {customer.vip ? (
                                  <Badge
                                      className="bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400 flex w-fit items-center">
                                    <Star className="mr-1 h-3 w-3 fill-current"/>
                                    VIP
                                  </Badge>
                              ) : (
                                  <Badge variant="outline" className="text-muted-foreground">
                                    Regular
                                  </Badge>
                              )}
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
                                    View profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4"/>
                                    Send email
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <ShoppingBag className="mr-2 h-4 w-4"/>
                                    View orders
                                  </DropdownMenuItem>
                                  {customer.vip ? (
                                      <DropdownMenuItem>
                                        <StarOff className="mr-2 h-4 w-4"/>
                                        Remove VIP status
                                      </DropdownMenuItem>
                                  ) : (
                                      <DropdownMenuItem>
                                        <Star className="mr-2 h-4 w-4"/>
                                        Mark as VIP
                                      </DropdownMenuItem>
                                  )}
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

// Sample data
const customers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder-user.jpg",
    orders: 12,
    totalSpent: 342.99,
    joinDate: "Jan 2023",
    vip: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    avatar: "/placeholder-user.jpg",
    orders: 8,
    totalSpent: 215.5,
    joinDate: "Feb 2023",
    vip: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 345-6789",
    avatar: "/placeholder-user.jpg",
    orders: 15,
    totalSpent: 456.75,
    joinDate: "Dec 2022",
    vip: true,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 456-7890",
    avatar: "/placeholder-user.jpg",
    orders: 5,
    totalSpent: 98.99,
    joinDate: "Mar 2023",
    vip: false,
  },
  {
    id: 5,
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    phone: "(555) 567-8901",
    avatar: "/placeholder-user.jpg",
    orders: 20,
    totalSpent: 572.45,
    joinDate: "Nov 2022",
    vip: true,
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 678-9012",
    avatar: "/placeholder-user.jpg",
    orders: 7,
    totalSpent: 189.99,
    joinDate: "Apr 2023",
    vip: false,
  },
  {
    id: 7,
    name: "David Martinez",
    email: "d.martinez@example.com",
    phone: "(555) 789-0123",
    avatar: "/placeholder-user.jpg",
    orders: 10,
    totalSpent: 325.5,
    joinDate: "Jan 2023",
    vip: false,
  },
  {
    id: 8,
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    phone: "(555) 890-1234",
    avatar: "/placeholder-user.jpg",
    orders: 6,
    totalSpent: 142.99,
    joinDate: "May 2023",
    vip: false,
  },
  {
    id: 9,
    name: "Thomas Brown",
    email: "t.brown@example.com",
    phone: "(555) 901-2345",
    avatar: "/placeholder-user.jpg",
    orders: 18,
    totalSpent: 487.8,
    joinDate: "Oct 2022",
    vip: true,
  },
  {
    id: 10,
    name: "Sophia Garcia",
    email: "s.garcia@example.com",
    phone: "(555) 012-3456",
    avatar: "/placeholder-user.jpg",
    orders: 9,
    totalSpent: 278.5,
    joinDate: "Feb 2023",
    vip: false,
  },
]

