import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function VideoFeed() {
    const [isConnected, setIsConnected] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setIsConnected(Math.random() > 0.1)
        }, 10000)

        return () => clearInterval(interval)
    }, [])

    // Cập nhật thời gian hiện tại
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Format thời gian theo định dạng camera an ninh
    const formattedTime = `${currentTime.getFullYear()}/${String(currentTime.getMonth() + 1).padStart(2, "0")}/${String(currentTime.getDate()).padStart(2, "0")} ${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`

    return (
        <Card className="col-span-full md:col-span-1 h-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                    <span>Camera An Ninh - Cửa Hàng</span>
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
                        <span className="text-xs font-normal">{isConnected ? "Đang kết nối" : "Mất kết nối"}</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
                <div className="relative w-full">
                    {isConnected ? (
                        <div className="relative w-full">
                            {/* Hiển thị hình ảnh camera */}
                            <div className="relative aspect-video w-full">
                                <Image
                                    src=""
                                    alt="Camera Feed"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    priority
                                />
                            </div>

                            {/* Overlay thông tin camera */}
                            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                {formattedTime} | IPcamera
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                Cam 01 - Main Store
                            </div>

                            {/* Thêm badge cảnh báo nếu cần */}
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded animate-pulse">
                                LIVE
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-200 aspect-video w-full flex items-center justify-center">
                            <p className="text-red-500 font-medium">Mất kết nối camera</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
