import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowRight, MoreHorizontal} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import type React from "react";
import OrderStatusBadgeComponent from "@/components/dashboard/OrderStatusBadge";
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
export default function CardRecenOrdersComponent() {
    return (
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
                                    <OrderStatusBadgeComponent status={order.status} />
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
    )
}