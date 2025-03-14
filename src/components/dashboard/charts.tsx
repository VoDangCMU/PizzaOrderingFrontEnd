"use client"

import { useEffect, useState } from "react"
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart as RechartsAreaChart,
    Area,
    BarChart as RechartsBarChart,
    Bar,
    Cell,
} from "recharts"

// Sample data for the area chart
const areaData = [
    { name: "01", value: 400 },
    { name: "02", value: 300 },
    { name: "03", value: 500 },
    { name: "04", value: 280 },
    { name: "05", value: 590 },
    { name: "06", value: 350 },
    { name: "07", value: 470 },
    { name: "08", value: 620 },
    { name: "09", value: 500 },
    { name: "10", value: 380 },
    { name: "11", value: 430 },
    { name: "12", value: 510 },
    { name: "13", value: 470 },
    { name: "14", value: 580 },
    { name: "15", value: 520 },
    { name: "16", value: 410 },
    { name: "17", value: 590 },
    { name: "18", value: 640 },
    { name: "19", value: 540 },
    { name: "20", value: 480 },
    { name: "21", value: 530 },
    { name: "22", value: 590 },
    { name: "23", value: 620 },
    { name: "24", value: 550 },
    { name: "25", value: 490 },
    { name: "26", value: 530 },
    { name: "27", value: 580 },
    { name: "28", value: 620 },
    { name: "29", value: 590 },
    { name: "30", value: 650 },
]

// Sample data for the bar chart
const barData = [
    { name: "Dragon's Breath", value: 120 },
    { name: "Tai Chi Supreme", value: 98 },
    { name: "Wudang Master", value: 86 },
    { name: "Shaolin Veggie", value: 72 },
    { name: "Kung Fu Chicken", value: 65 },
]

export function AreaChart() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart
                    data={areaData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        className="text-xs text-muted-foreground"
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                                                <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                                                <span className="font-bold">${payload[0].value}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary) / 0.2)"
                        strokeWidth={2}
                    />
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export function BarChart() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                    data={barData}
                    layout="vertical"
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                    <XAxis type="number" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                    <YAxis
                        type="category"
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        width={100}
                        className="text-xs text-muted-foreground"
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Item</span>
                                                <span className="font-bold text-muted-foreground">{label}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Orders</span>
                                                <span className="font-bold">{payload[0].value}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                        {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))"} />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    )
}

