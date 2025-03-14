"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Download,
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { AreaChart, BarChart } from "@/components/dashboard/charts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days")

  return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
              <p className="text-muted-foreground">Track your business performance and growth</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4"/>
                  <SelectValue placeholder="Select date range"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4"/>
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Total Revenue"
                    value="$45,231.89"
                    description="+20.1% from last month"
                    trend="up"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCard
                    title="Orders"
                    value="2,345"
                    description="+12.3% from last month"
                    trend="up"
                    icon={<ShoppingBag className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCard
                    title="Customers"
                    value="1,893"
                    description="+8.2% from last month"
                    trend="up"
                    icon={<Users className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCard
                    title="Active Menu Items"
                    value="32"
                    description="-2 from last month"
                    trend="down"
                    icon={<Utensils className="h-4 w-4 text-muted-foreground"/>}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Daily revenue for the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2">
                    <AreaChart/>
                  </CardContent>
                </Card>

                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Popular Items</CardTitle>
                    <CardDescription>Top selling menu items this month</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2">
                    <BarChart/>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Time of Day</CardTitle>
                    <CardDescription>When your customers are ordering</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Time of day chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Category</CardTitle>
                    <CardDescription>Which categories are most popular</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Category chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Retention</CardTitle>
                    <CardDescription>New vs returning customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Retention chart</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>Detailed sales data and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Sales analytics content</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Analytics</CardTitle>
                  <CardDescription>Performance metrics for your menu items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Product analytics content</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                  <CardDescription>Insights about your customer base</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Customer analytics content</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
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
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-600"/>
            ) : (
                <ArrowDownRight className="mr-1 h-4 w-4 text-red-600"/>
            )}
            <span className={trend === "up" ? "text-green-600" : "text-red-600"}>{description}</span>
          </p>
        </CardContent>
      </Card>
  )
}

