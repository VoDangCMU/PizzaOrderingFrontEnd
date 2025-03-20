import type React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowDownRight, ArrowUpRight} from "lucide-react";

export default function MetricCardComponent({
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