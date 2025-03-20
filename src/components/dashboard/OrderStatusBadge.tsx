import {Badge} from "@/components/ui/badge";
import type React from "react";
export default function OrderStatusBadgeComponent({ status }: { status: string }) {
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