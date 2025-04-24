"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import PizzaUpload from "@/components/dashboard/pizza-upload"

export default function PizzaUploadPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/menu">Menu</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>Upload Pizza</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <h2 className="text-3xl font-bold tracking-tight">Upload New Pizza</h2>
                    <p className="text-muted-foreground">Create a new pizza with size and image in three steps</p>
                </div>

                <PizzaUpload />
            </div>
        </DashboardLayout>
    )
}
