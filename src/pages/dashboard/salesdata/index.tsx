"use client"

import { useEffect, useState } from "react"
import { ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table as UITable,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface SalesDataItem {
    Year: number
    Month: number
    Day: number
    Country: string
    City: string
    Category: string
    Pizza: string
    Revenue: number
    TotalQuantity: number
    Shop: string
}

export default function SalesdataPage() {
    const [items, setItems] = useState<SalesDataItem[]>([])
    const [loading, setLoading] = useState(true)
    const formatedMonthName = (month: number) => {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        return monthNames[month - 1];
    }
    const fetchData = async (selectedFieldsObj: Record<string, boolean> = selectedFields) => {
        setLoading(true)
        const ai_api = localStorage.getItem("ai_api")

        // Convert the selected fields object to an array of field names for the API
        const apiFieldsMap: Record<string, string> = {
            country: "Country",
            city: "City",
            shop: "Shop",
            day: "Day",
            month: "Month",
            year: "Year",
            category: "Category",
            product: "Pizza Name",
        }

        // Always include these fields in the API request
        const selectedApiFields = ["Revenue", "TotalQuantity"]

        // Add the selected fields to the API request
        Object.entries(selectedFieldsObj).forEach(([field, isSelected]) => {
            if (isSelected && apiFieldsMap[field]) {
                selectedApiFields.push(apiFieldsMap[field])
            }
        })

        try {
            const res = await axios.post(`${ai_api}/fact-combined`, {
                selected: selectedApiFields,
            })
            if (res.status === 200) {
                setItems(res.data.result)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>({
        country: false,
        city: false,
        shop: false,
        day: false,
        month: false,
        year: false,
        category: false,
        product: false,
    })

    // State to track specific filter values
    const [filterValues, setFilterValues] = useState<Record<string, string>>({
        country: "",
        city: "",
        shop: "",
        day: "",
        month: "",
        year: "",
        category: "",
        product: "",
    })



    // Toggle selection state for a field and set filter value
    const toggleField = (field: string) => {
        const newValue = !selectedFields[field]
        const newSelectedFields = {
            ...selectedFields,
            [field]: newValue,
        }
        setSelectedFields(newSelectedFields)

        // If turning off a filter, reset its value
        if (!newValue) {
            setFilterValues((prev) => ({
                ...prev,
                [field]: "",
            }))
        }

        // Call API with updated selected fields
        fetchData(newSelectedFields)
    }

    // Check if any filters are active
    const hasActiveFilters = Object.values(selectedFields).some((value) => value)

    useEffect(() => {
        // Only fetch data if there are selected fields
        const hasSelectedFields = Object.values(selectedFields).some((value) => value)
        if (hasSelectedFields) {
            fetchData()
        } else {
            // Initial load - fetch minimal data or set empty array
            setItems([])
            setLoading(false)
        }
    }, [])
    // Reset all filters function
    const resetAllFilters = () => {
        const resetFields = {
            country: false,
            city: false,
            shop: false,
            day: false,
            month: false,
            year: false,
            category: false,
            product: false,
        }
        setSelectedFields(resetFields)
        setFilterValues({
            country: "",
            city: "",
            shop: "",
            day: "",
            month: "",
            year: "",
            category: "",
            product: "",
        })
        // Reset data
        setItems([])
    }

    console.log(filterValues)

    return (
        <DashboardLayout>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-pink-600">Sales Data Management</h1>
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            onClick={resetAllFilters}
                            className="border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-pink-600"
                        >
                            <X className="h-4 w-4 mr-2"/>
                            Reset All Filters
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Column 1: Location */}
                    <Card className="border-pink-100">
                        <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                            <CardTitle className="text-pink-700">Location</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Button
                                    variant={selectedFields.country ? "default" : "outline"}
                                    onClick={() => toggleField("country")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.country ? "Country Selected" : "Country"}
                                </Button>

                                <Button
                                    variant={selectedFields.city ? "default" : "outline"}
                                    onClick={() => toggleField("city")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.city ? "City Selected" : "City"}
                                </Button>

                                <Button
                                    variant={selectedFields.shop ? "default" : "outline"}
                                    onClick={() => toggleField("shop")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.shop ? "Shop Selected" : "Shop"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Column 2: Time Period */}
                    <Card className="border-pink-100">
                        <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                            <CardTitle className="text-pink-700">Time Period</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Button
                                    variant={selectedFields.day ? "default" : "outline"}
                                    onClick={() => toggleField("day")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.day ? "Day Selected" : "Day"}
                                </Button>

                                <Button
                                    variant={selectedFields.month ? "default" : "outline"}
                                    onClick={() => toggleField("month")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.month ? "Month Selected" : "Month"}
                                </Button>

                                <Button
                                    variant={selectedFields.year ? "default" : "outline"}
                                    onClick={() => toggleField("year")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.year ? "Year Selected" : "Year"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Column 3: Product */}
                    <Card className="border-pink-100">
                        <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                            <CardTitle className="text-pink-700">Product</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Button
                                    variant={selectedFields.category ? "default" : "outline"}
                                    onClick={() => toggleField("category")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.category ? "Category Selected" : "Category"}
                                </Button>

                                <Button
                                    variant={selectedFields.product ? "default" : "outline"}
                                    onClick={() => toggleField("product")}
                                    className="w-full border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                >
                                    {selectedFields.product ? "Pizza Selected" : "Pizza"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Display selected fields */}
                {loading ? (
                    <Card className="border-pink-100 text-center p-10">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="rounded-full bg-pink-50 p-6 animate-pulse">
                                <ChevronsUpDown className="h-10 w-10 text-pink-400"/>
                            </div>
                            <h3 className="text-xl font-medium text-pink-700">Loading data...</h3>
                            <p className="text-pink-500 max-w-md">Please wait while we fetch the sales data.</p>
                        </div>
                    </Card>
                ) : hasActiveFilters && items && items.length > 0 ? (
                    <Card className="border-pink-100">
                        <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                            <CardTitle className="text-pink-700">Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <UITable>
                                    <TableCaption>{items.length} results found</TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-pink-50">
                                            {selectedFields.day && <TableHead className="text-pink-700">Day</TableHead>}
                                            {selectedFields.month &&
                                                <TableHead className="text-pink-700">Month</TableHead>}
                                            {selectedFields.year &&
                                                <TableHead className="text-pink-700">Year</TableHead>}
                                            {selectedFields.country &&
                                                <TableHead className="text-pink-700">Country</TableHead>}
                                            {selectedFields.city &&
                                                <TableHead className="text-pink-700">City</TableHead>}
                                            {selectedFields.shop &&
                                                <TableHead className="text-pink-700">Shop</TableHead>}
                                            {selectedFields.category &&
                                                <TableHead className="text-pink-700">Category</TableHead>}
                                            {selectedFields.product &&
                                                <TableHead className="text-pink-700">Pizza</TableHead>}
                                            <TableHead className="text-pink-700">Quantity</TableHead>
                                            <TableHead className="text-right text-pink-700">Revenue (USD)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item, index) => (
                                            <TableRow key={index} className="hover:bg-pink-50">
                                                {selectedFields.day && <TableCell>{item.Day}</TableCell>}
                                                {selectedFields.month &&
                                                    <TableCell>{formatedMonthName(item.Month)}</TableCell>}
                                                {selectedFields.year && <TableCell>{item.Year}</TableCell>}
                                                {selectedFields.country && <TableCell>{item.Country}</TableCell>}
                                                {selectedFields.city && <TableCell>{item.City}</TableCell>}
                                                {selectedFields.shop && <TableCell>{item.Shop}</TableCell>}
                                                {selectedFields.category && <TableCell>{item.Category}</TableCell>}
                                                {selectedFields.product && <TableCell>{item.Pizza}</TableCell>}
                                                <TableCell>{item.TotalQuantity}</TableCell>
                                                <TableCell
                                                    className="text-right font-medium">${item.Revenue.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </UITable>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-pink-100 text-center p-10">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="rounded-full bg-pink-50 p-6">
                                <ChevronsUpDown className="h-10 w-10 text-pink-400"/>
                            </div>
                            <h3 className="text-xl font-medium text-pink-700">
                                {items && items.length === 0 ? "No Data Available" : "Select Filters to View Data"}
                            </h3>
                            <p className="text-pink-500 max-w-md">
                                {items && items.length === 0
                                    ? "There is no data available. Please check your API connection."
                                    : "Please select at least one filter from the options above to display the selected fields."}
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </DashboardLayout>

    )
}
