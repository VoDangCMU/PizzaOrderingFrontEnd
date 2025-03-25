"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent} from "@/components/ui/tabs"
import {
  Calendar,
  Download,
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MetricCardComponent from "@/components/dashboard/MetricCard";
import RevenueOverviewComponent from "@/components/dashboard/RevenueOverview";

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
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCardComponent
                    title="Total Revenue"
                    value="$45,231.89"
                    description="+20.1% from last month"
                    trend="up"
                    icon={<DollarSign className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCardComponent
                    title="Orders"
                    value="2,345"
                    description="+12.3% from last month"
                    trend="up"
                    icon={<ShoppingBag className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCardComponent
                    title="Customers"
                    value="1,893"
                    description="+8.2% from last month"
                    trend="up"
                    icon={<Users className="h-4 w-4 text-muted-foreground"/>}
                />
                <MetricCardComponent
                    title="Active Menu Items"
                    value="32"
                    description="-2 from last month"
                    trend="down"
                    icon={<Utensils className="h-4 w-4 text-muted-foreground"/>}
                />
              </div>

              <RevenueOverviewComponent/>

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
          </Tabs>
        </div>
      </DashboardLayout>

  )
}


