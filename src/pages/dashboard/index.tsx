"use client"

import type React from "react"

import type { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  ShoppingBag,
  Users,
  Utensils,
  Calendar,
} from "lucide-react"

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MetricCardComponent from "@/components/dashboard/MetricCard";
import RevenueOverviewComponent from "@/components/dashboard/RevenueOverview";
import CardRecentOrdersComponent from "@/components/dashboard/CardRecentOrders";

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
                <p className="text-muted-foreground">Here&#39;s what&#39;s happening with your pizza empire today.</p>
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
                  <MetricCardComponent
                      title="Total Revenue"
                      value="$45,231.89"
                      description="+20.1% from last month"
                      trend="up"
                      icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCardComponent
                      title="Orders"
                      value="2,345"
                      description="+12.3% from last month"
                      trend="up"
                      icon={<ShoppingBag className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCardComponent
                      title="Customers"
                      value="1,893"
                      description="+8.2% from last month"
                      trend="up"
                      icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  />
                  <MetricCardComponent
                      title="Active Menu Items"
                      value="32"
                      description="-2 from last month"
                      trend="down"
                      icon={<Utensils className="h-4 w-4 text-muted-foreground" />}
                  />
                </div>

                <RevenueOverviewComponent/>
                <CardRecentOrdersComponent/>
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

export default Dashboard

