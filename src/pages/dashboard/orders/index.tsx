"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, Truck } from "lucide-react"
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
              <p className="text-muted-foreground">Manage and track customer orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4"/>
                Advanced Filters
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
                <CardTitle>Order Management</CardTitle>
                <CardDescription>You have {filteredOrders.length} orders in total</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                  <Input
                      type="search"
                      placeholder="Search orders..."
                      className="pl-8 w-full sm:w-[240px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">#{order.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={order.customer.avatar} alt={order.customer.name}/>
                                  <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{order.customer.name}</div>
                                  <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{order.items} items</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <OrderStatusBadge status={order.status}/>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
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
                                    <Truck className="mr-2 h-4 w-4"/>
                                    Update status
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4"/>
                                    Mark as completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4"/>
                                    Cancel order
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No orders found.
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

function OrderStatusBadge({status}: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="mr-1 h-3 w-3"/>
      case "Processing":
        return <Truck className="mr-1 h-3 w-3"/>
      case "Pending":
        return <Clock className="mr-1 h-3 w-3"/>
      case "Cancelled":
        return <XCircle className="mr-1 h-3 w-3"/>
      default:
        return null
    }
  }

  return (
      <Badge variant="outline" className={`${getStatusStyles()} font-medium flex w-fit items-center`}>
        {getStatusIcon()}
        {status}
      </Badge>
  )
}

// Sample data
const orders = [
  {
    id: "ORD-7652",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 3,
    total: 42.99,
    status: "Completed",
    date: "Today, 2:30 PM",
  },
  {
    id: "ORD-7651",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 2,
    total: 28.5,
    status: "Processing",
    date: "Today, 1:15 PM",
  },
  {
    id: "ORD-7650",
    customer: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 4,
    total: 56.75,
    status: "Pending",
    date: "Today, 12:45 PM",
  },
  {
    id: "ORD-7649",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 1,
    total: 18.99,
    status: "Completed",
    date: "Today, 11:30 AM",
  },
  {
    id: "ORD-7648",
    customer: {
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 5,
    total: 72.45,
    status: "Cancelled",
    date: "Today, 10:15 AM",
  },
  {
    id: "ORD-7647",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 2,
    total: 34.99,
    status: "Completed",
    date: "Yesterday, 4:30 PM",
  },
  {
    id: "ORD-7646",
    customer: {
      name: "David Martinez",
      email: "d.martinez@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 3,
    total: 45.5,
    status: "Processing",
    date: "Yesterday, 3:15 PM",
  },
  {
    id: "ORD-7645",
    customer: {
      name: "Jennifer Lee",
      email: "j.lee@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 1,
    total: 22.99,
    status: "Completed",
    date: "Yesterday, 1:45 PM",
  },
  {
    id: "ORD-7644",
    customer: {
      name: "Thomas Brown",
      email: "t.brown@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 4,
    total: 67.8,
    status: "Pending",
    date: "Yesterday, 11:30 AM",
  },
  {
    id: "ORD-7643",
    customer: {
      name: "Sophia Garcia",
      email: "s.garcia@example.com",
      avatar: "/placeholder-user.jpg",
    },
    items: 2,
    total: 38.5,
    status: "Cancelled",
    date: "Yesterday, 10:15 AM",
  },
]

