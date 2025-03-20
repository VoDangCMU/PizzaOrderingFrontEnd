import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {AreaChart, BarChart} from "@/components/dashboard/charts";
import type React from "react";

export default function RevenueOverviewComponent() {
    return (
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
    )
}