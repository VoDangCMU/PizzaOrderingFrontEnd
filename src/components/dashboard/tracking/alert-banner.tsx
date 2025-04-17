import { AlertTriangle } from "lucide-react"

interface AlertBannerProps {
    message: string
    rate: number
}

export function AlertBanner({ message, rate }: AlertBannerProps) {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
                <p className="font-bold">CẢNH BÁO</p>
                <p>{message}</p>
                <p className="mt-1 text-sm">
                    Tỷ lệ hiện tại: <span className="font-bold">{(rate * 100).toFixed(1)}%</span>
                </p>
            </div>
        </div>
    )
}
