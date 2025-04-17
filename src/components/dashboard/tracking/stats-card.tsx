import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
    title: string
    value: string | number
    description?: string
    status?: "success" | "warning" | "danger" | "default"
}

export function StatsCard({ title, value, description, status = "default" }: StatsCardProps) {
    const getStatusColor = () => {
        switch (status) {
            case "success":
                return "text-green-600"
            case "warning":
                return "text-amber-600"
            case "danger":
                return "text-red-600"
            default:
                return "text-gray-900"
        }
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${getStatusColor()}`}>{value}</div>
                {description && <CardDescription className="text-xs mt-1">{description}</CardDescription>}
            </CardContent>
        </Card>
    )
}
