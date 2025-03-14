"use client"

import type React from "react"

import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
  MoreHorizontal,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AreaChart, BarChart } from "@/components/dashboard/charts"
import DashboardLayout from "@/components/layouts/DashboardLayout";

const Dashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState("overview")

  return (

      <DashboardLayout>
        <>
          <Head>
            <title>Dashboard - Võ Đang Pizza</title>
          </Head>

          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, Master Wong</h2>
                <p className="text-muted-foreground">Here's what's happening with your pizza empire today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Date Range
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Download Report
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <MetricCard
                      title="Total Revenue"
                      value="$45,231.89"
                      description="+20.1% from last month"
                      trend="up"
                      icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCard
                      title="Orders"
                      value="2,345"
                      description="+12.3% from last month"
                      trend="up"
                      icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCard
                      title="Customers"
                      value="1,893"
                      description="+8.2% from last month"
                      trend="up"
                      icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCard
                      title="Active Menu Items"
                      value="32"
                      description="-2 from last month"
                      trend="down"
                      icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Daily revenue for the past 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <AreaChart />
                    </CardContent>
                  </Card>

                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Popular Items</CardTitle>
                      <CardDescription>Top selling menu items this month</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <BarChart />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>You have {recentOrders.length} orders today</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">#{order.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                                    <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{order.customer.name}</div>
                                </div>
                              </TableCell>
                              <TableCell>{order.items} items</TableCell>
                              <TableCell>${order.total.toFixed(2)}</TableCell>
                              <TableCell>
                                <OrderStatusBadge status={order.status} />
                              </TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View details</DropdownMenuItem>
                                    <DropdownMenuItem>Update status</DropdownMenuItem>
                                    <DropdownMenuItem>Contact customer</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Content</CardTitle>
                    <CardDescription>Detailed analytics will be displayed here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Analytics dashboard content</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports Content</CardTitle>
                    <CardDescription>Generated reports will be displayed here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Reports dashboard content</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications Content</CardTitle>
                    <CardDescription>Your notifications will be displayed here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Notifications dashboard content</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      </DashboardLayout>
  )
}

function MetricCard({
                      title,
                      value,
                      description,
                      trend,
                      icon,
                    }: {
  title: string
  value: string
  description: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend === "up" ? (
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-600" />
            ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-600" />
            )}
            <span className={trend === "up" ? "text-green-600" : "text-red-600"}>{description}</span>
          </p>
        </CardContent>
      </Card>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
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

  return (
      <Badge variant="outline" className={`${getStatusStyles()} font-medium`}>
        {status}
      </Badge>
  )
}

// Sample data
const recentOrders = [
  {
    id: "ORD-7652",
    customer: {
      name: "John Smith",
      avatar: "/placeholder-user.jpg",
    },
    items: 3,
    total: 42.99,
    status: "Completed",
    date: "Just now",
  },
  {
    id: "ORD-7651",
    customer: {
      name: "Sarah Johnson",
      avatar: "/placeholder-user.jpg",
    },
    items: 2,
    total: 28.5,
    status: "Processing",
    date: "15 minutes ago",
  },
  {
    id: "ORD-7650",
    customer: {
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
    },
    items: 4,
    total: 56.75,
    status: "Pending",
    date: "45 minutes ago",
  },
  {
    id: "ORD-7649",
    customer: {
      name: "Emily Davis",
      avatar: "/placeholder-user.jpg",
    },
    items: 1,
    total: 18.99,
    status: "Completed",
    date: "1 hour ago",
  },
  {
    id: "ORD-7648",
    customer: {
      name: "Robert Wilson",
      avatar: "/placeholder-user.jpg",
    },
    items: 5,
    total: 72.45,
    status: "Cancelled",
    date: "2 hours ago",
  },
]

export default Dashboard

