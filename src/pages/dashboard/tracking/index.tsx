import { useState, useEffect } from "react"
import { VideoFeed } from "@/components/dashboard/tracking/video-feed"
import { StatsCard } from "@/components/dashboard/tracking/stats-card"
import { AlertBanner } from "@/components/dashboard/tracking/alert-banner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        checkedIn: 45,
        checkedOut: 32,
        currentCustomers: 13,
        amountBill: 8,
        rate: 0.62,
    })

    const [showAlert, setShowAlert] = useState(false)
    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, customer: "Khách hàng #104", amount: "120.000đ", time: "10:23" },
        { id: 2, customer: "Khách hàng #103", amount: "85.000đ", time: "10:15" },
        { id: 3, customer: "Khách hàng #102", amount: "210.000đ", time: "10:02" },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            const randomChange = Math.random()
            setStats((prev) => {
                const newStats = { ...prev }

                if (randomChange < 0.3 && prev.currentCustomers > 0) {
                    // Khách hàng rời đi và thanh toán
                    newStats.checkedOut = prev.checkedOut + 1
                    newStats.currentCustomers = prev.currentCustomers - 1
                    newStats.amountBill = prev.amountBill + 1

                    // Thêm giao dịch mới
                    const newTransaction = {
                        id: Date.now(),
                        customer: `Khách hàng #${105 + prev.amountBill}`,
                        amount: `${Math.floor(Math.random() * 200 + 50)}.000đ`,
                        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                    }

                    setRecentTransactions((prev) => [newTransaction, ...prev.slice(0, 2)])
                } else if (randomChange < 0.6) {
                    // Khách hàng mới vào
                    newStats.checkedIn = prev.checkedIn + 1
                    newStats.currentCustomers = prev.currentCustomers + 1
                } else if (randomChange < 0.7 && prev.currentCustomers > 0) {
                    // Khách hàng rời đi mà không thanh toán
                    newStats.checkedOut = prev.checkedOut + 1
                    newStats.currentCustomers = prev.currentCustomers - 1
                }

                // Tính toán lại tỷ lệ
                newStats.rate = newStats.amountBill / newStats.checkedOut

                // Kiểm tra ngưỡng cảnh báo
                setShowAlert(newStats.rate < 0.5)

                return newStats
            })
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <DashboardLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Dashboard Giám Sát Cửa Hàng</h1>

                {showAlert && (
                    <AlertBanner
                        message="CẢNH BÁO: Tỷ lệ thanh toán thấp! Có thể có khách hàng rời đi mà không thanh toán."
                        rate={stats.rate}
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <VideoFeed/>

                    <div className="grid grid-cols-2 gap-4">
                        <StatsCard title="Checked In" value={stats.checkedIn}/>
                        <StatsCard title="Checked Out" value={stats.checkedOut}/>
                        <StatsCard title="Current Customers" value={stats.currentCustomers}/>
                        <StatsCard title="Amount Bill" value={stats.amountBill}/>
                        <StatsCard
                            title="Rate"
                            value={`${(stats.rate * 100).toFixed(1)}%`}
                            description="Bill/Customer"
                            status={stats.rate < 0.5 ? "danger" : stats.rate < 0.7 ? "warning" : "success"}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle>Thống kê theo thời gian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                                <p className="text-gray-500">Biểu đồ thống kê sẽ hiển thị ở đây</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Giao dịch gần đây</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentTransactions.map((transaction) => (
                                    <div key={transaction.id}
                                         className="flex justify-between items-center border-b pb-2">
                                        <div>
                                            <p className="font-medium">{transaction.customer}</p>
                                            <p className="text-sm text-gray-500">{transaction.time}</p>
                                        </div>
                                        <div className="font-medium text-green-600">{transaction.amount}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>

    )
}
