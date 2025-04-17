"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Add shops to the cityToCountry mapping
const cityToCountry = {
    DaNang: "Vietnam",
    HaNoi: "Vietnam",
    Hue: "Vietnam",
}

// Add shops data
const shops = [
    { label: "Shop A", value: "shop_a", city: "danang" },
    { label: "Shop B", value: "shop_b", city: "danang" },
    { label: "Shop C", value: "shop_c", city: "hanoi" },
    { label: "Shop D", value: "shop_d", city: "hanoi" },
    { label: "Shop E", value: "shop_e", city: "hue" },
    { label: "Shop F", value: "shop_f", city: "hue" },
]

// Define product categories and products
const productCategories = [
    { label: "Pizza", value: "pizza" },
    { label: "Pasta", value: "pasta" },
    { label: "Beverages", value: "beverages" },
]

const products = {
    pizza: [
        { label: "Margherita", value: "margherita" },
        { label: "Pepperoni", value: "pepperoni" },
        { label: "Hawaiian", value: "hawaiian" },
    ],
    pasta: [
        { label: "Spaghetti", value: "spaghetti" },
        { label: "Fettuccine", value: "fettuccine" },
        { label: "Lasagna", value: "lasagna" },
    ],
    beverages: [
        { label: "Soft Drinks", value: "soft_drinks" },
        { label: "Coffee", value: "coffee" },
        { label: "Tea", value: "tea" },
    ],
}

// Generate random day for each month entry
const generateRandomDay = (month: number) => {
    // Get max days for the month (simplified)
    const maxDays = month === 2 ? 28 : month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31
    return Math.floor(Math.random() * maxDays) + 1
}

// Data from JSON with added product information and day
const sampleData = [
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8395,
        Revenue: 152224.16000000032,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8388,
        Revenue: 138266.00000000003,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8388,
        Revenue: 138266.00000000003,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7853,
        Revenue: 142156.66000000003,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7853,
        Revenue: 129226.99999999994,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4562,
        Revenue: 75177.69999999998,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8447,
        Revenue: 153561.81,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5029,
        Revenue: 83092.65000000001,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8447,
        Revenue: 139595.10000000003,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8218,
        Revenue: 149632.19999999998,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5018,
        Revenue: 82959.89999999998,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4656,
        Revenue: 76958.90000000002,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8579,
        Revenue: 155725.97999999995,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5231,
        Revenue: 86227.09999999998,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4908,
        Revenue: 80927.09999999998,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8133,
        Revenue: 148550.0099999998,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 4988,
        Revenue: 82768.65,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4688,
        Revenue: 78013.15,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8702,
        Revenue: 158127.35,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8693,
        Revenue: 143585.35,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8693,
        Revenue: 143585.35,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8272,
        Revenue: 149085.96000000008,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8262,
        Revenue: 135347.05000000002,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8262,
        Revenue: 135347.05000000002,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7719,
        Revenue: 140112.62999999995,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7709,
        Revenue: 127198.04999999999,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 7709,
        Revenue: 127198.04999999999,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7682,
        Revenue: 139301.62000000005,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 4839,
        Revenue: 79710.05000000002,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4434,
        Revenue: 73045.15000000002,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8453,
        Revenue: 153440.80000000022,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5048,
        Revenue: 83115.24999999999,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8451,
        Revenue: 139449.35,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7794,
        Revenue: 140972.84000000008,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7794,
        Revenue: 128151.15000000004,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4466,
        Revenue: 73299.35000000002,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
].map((item) => ({
    ...item,
    Date: new Date(item.Year, item.Month - 1, item.Day),
}))

// Fill in the rest of the data with days
const fullSampleData = [
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8395,
        Revenue: 152224.16000000032,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8388,
        Revenue: 138266.00000000003,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(1),
        Month: 1,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8388,
        Revenue: 138266.00000000003,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7853,
        Revenue: 142156.66000000003,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7853,
        Revenue: 129226.99999999994,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(2),
        Month: 2,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4562,
        Revenue: 75177.69999999998,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8447,
        Revenue: 153561.81,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5029,
        Revenue: 83092.65000000001,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(3),
        Month: 3,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8447,
        Revenue: 139595.10000000003,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8218,
        Revenue: 149632.19999999998,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5018,
        Revenue: 82959.89999999998,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(4),
        Month: 4,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4656,
        Revenue: 76958.90000000002,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8579,
        Revenue: 155725.97999999995,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5231,
        Revenue: 86227.09999999998,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(5),
        Month: 5,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4908,
        Revenue: 80927.09999999998,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8133,
        Revenue: 148550.0099999998,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 4988,
        Revenue: 82768.65,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(6),
        Month: 6,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4688,
        Revenue: 78013.15,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8702,
        Revenue: 158127.35,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8693,
        Revenue: 143585.35,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(7),
        Month: 7,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8693,
        Revenue: 143585.35,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8272,
        Revenue: 149085.96000000008,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 8262,
        Revenue: 135347.05000000002,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(8),
        Month: 8,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8262,
        Revenue: 135347.05000000002,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7719,
        Revenue: 140112.62999999995,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7709,
        Revenue: 127198.04999999999,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(9),
        Month: 9,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 7709,
        Revenue: 127198.04999999999,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7682,
        Revenue: 139301.62000000005,
        ProductCategory: "Pizza",
        Product: "Hawaiian",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 4839,
        Revenue: 79710.05000000002,
        ProductCategory: "Pasta",
        Product: "Fettuccine",
    },
    {
        Day: generateRandomDay(10),
        Month: 10,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4434,
        Revenue: 73045.15000000002,
        ProductCategory: "Beverages",
        Product: "Tea",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 8453,
        Revenue: 153440.80000000022,
        ProductCategory: "Pizza",
        Product: "Margherita",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 5048,
        Revenue: 83115.24999999999,
        ProductCategory: "Pasta",
        Product: "Spaghetti",
    },
    {
        Day: generateRandomDay(11),
        Month: 11,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 8451,
        Revenue: 139449.35,
        ProductCategory: "Beverages",
        Product: "Soft Drinks",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "DaNang",
        TotalQuantity: 7794,
        Revenue: 140972.84000000008,
        ProductCategory: "Pizza",
        Product: "Pepperoni",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "HaNoi",
        TotalQuantity: 7794,
        Revenue: 128151.15000000004,
        ProductCategory: "Pasta",
        Product: "Lasagna",
    },
    {
        Day: generateRandomDay(12),
        Month: 12,
        Year: 2023,
        City: "Hue",
        TotalQuantity: 4466,
        Revenue: 73299.35000000002,
        ProductCategory: "Beverages",
        Product: "Coffee",
    },
].map((item) => ({
    ...item,
    Date: new Date(item.Year, item.Month - 1, item.Day),
}))

// Get unique countries
const countries = Array.from(new Set(Object.values(cityToCountry))).map((country) => ({
    label: country,
    value: country.toLowerCase(),
}))

// Get unique cities
const cities = Array.from(new Set(fullSampleData.map((item) => item.City))).map((city) => ({
    label: city,
    value: city.toLowerCase(),
    country: cityToCountry[city as keyof typeof cityToCountry].toLowerCase(),
}))

// Create months array
const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1
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
    return { label: monthNames[i], value: monthNum.toString() }
})

// Create years array
const years = Array.from({ length: 11 }, (_, i) => {
    const year = 2023 + i
    return { label: `${year}`, value: year.toString() }
})

// Create days array
const days = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1
    return { label: dayNum.toString(), value: dayNum.toString() }
})

export default function Dashboard() {
    // Filter states
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [dateType, setDateType] = useState<"day" | "month" | "year">("month")
    const [date, setDate] = useState<Date | undefined>()
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("2023")
    const [category, setCategory] = useState("")
    const [product, setProduct] = useState("")

    // Add shop state in the Dashboard component
    const [shop, setShop] = useState("")

    // Popover states
    const [openCountry, setOpenCountry] = useState(false)
    const [openCity, setOpenCity] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)
    const [openDate, setOpenDate] = useState(false)

    // Add shop state in the Dashboard component
    const [openShop, setOpenShop] = useState(false)

    // Filtered data state
    const [filteredData, setFilteredData] = useState(fullSampleData)

    // Add a new state variable to track if any filters are active
    const [hasActiveFilters, setHasActiveFilters] = useState(false)

    // Reset city when country changes
    useEffect(() => {
        setCity("")
    }, [country])

    // Reset product when category changes
    useEffect(() => {
        setProduct("")
    }, [category])

    // Reset date filters when dateType changes
    useEffect(() => {
        setDate(undefined)
        setMonth("")
    }, [dateType])

    // Reset shop when city changes
    useEffect(() => {
        setShop("")
    }, [city])

    // Update the filter logic to include shop
    useEffect(() => {
        let result = [...fullSampleData]

        // Check if any filters are active
        const isAnyFilterActive = !!(
            country ||
            city ||
            shop ||
            (dateType === "day" && date) ||
            (dateType === "month" && month) ||
            (dateType === "year" && year) ||
            category ||
            product
        )

        setHasActiveFilters(isAnyFilterActive)

        if (country) {
            result = result.filter((item) => cityToCountry[item.City as keyof typeof cityToCountry].toLowerCase() === country)
        }

        if (city) {
            const cityValue = cities.find((c) => c.value === city)?.label
            result = result.filter((item) => item.City === cityValue)
        }

        if (shop) {
            // In a real application, you would filter by shop here
            // For this example, we'll just reduce the results by half to simulate filtering
            result = result.slice(0, Math.ceil(result.length / 2))
        }

        // Replace the date filtering logic with the new implementation
        // Filter by specific day, month, and year
        if (dateType === "day" && date) {
            result = result.filter(
                (item) => item.Day === date.getDate() && item.Month === date.getMonth() + 1 && item.Year === date.getFullYear(),
            )
        }
        // Filter by month
        else if (dateType === "month" && month) {
            const monthNum = Number.parseInt(month)
            result = result.filter((item) => item.Month === monthNum)
        }
        // Filter by year
        else if (dateType === "year" && year) {
            const yearNum = Number.parseInt(year)
            result = result.filter((item) => item.Year === yearNum)
        }

        // Filter by product category
        if (category) {
            const categoryLabel = productCategories.find((c) => c.value === category)?.label
            result = result.filter((item) => item.ProductCategory === categoryLabel)
        }

        // Filter by product
        if (product) {
            const productLabel = products[category as keyof typeof products]?.find((p) => p.value === product)?.label
            result = result.filter((item) => item.Product === productLabel)
        }

        setFilteredData(result)
    }, [country, city, shop, date, month, dateType, category, product, year])

    // Clear time filter
    const clearTimeFilter = () => {
        if (dateType === "day") {
            setDate(undefined)
        } else if (dateType === "month") {
            setMonth("")
        }
    }

    const [day, setDay] = useState("")

    // Clear time filter
    const handleClearTimeFilter = () => {
        setDay("")
        setMonth("")
        setYear("2023")
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8 text-pink-600">Sales Data Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Column 1: Location */}
                <Card className="border-pink-100">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                        <CardTitle className="text-pink-700">Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Country Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-pink-700">Country</label>
                            <Popover open={openCountry} onOpenChange={setOpenCountry}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCountry}
                                        className="w-full justify-between border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                    >
                                        {country ? countries.find((c) => c.value === country)?.label : "Select country..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search country..." />
                                        <CommandList>
                                            <CommandEmpty>No country found.</CommandEmpty>
                                            <CommandGroup>
                                                {countries.map((c) => (
                                                    <CommandItem
                                                        key={c.value}
                                                        value={c.value}
                                                        onSelect={(currentValue) => {
                                                            setCountry(currentValue === country ? "" : currentValue)
                                                            setOpenCountry(false)
                                                        }}
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", country === c.value ? "opacity-100" : "opacity-0")} />
                                                        {c.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* City Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-pink-700">City</label>
                            <Popover open={openCity} onOpenChange={setOpenCity}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCity}
                                        className="w-full justify-between border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        disabled={country && cities.filter((c) => c.country === country).length === 0}
                                    >
                                        {city ? cities.find((c) => c.value === city)?.label : "Select city..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search city..." />
                                        <CommandList>
                                            <CommandEmpty>No city found.</CommandEmpty>
                                            <CommandGroup>
                                                {cities
                                                    .filter((c) => !country || c.country === country)
                                                    .map((c) => (
                                                        <CommandItem
                                                            key={c.value}
                                                            value={c.value}
                                                            onSelect={(currentValue) => {
                                                                setCity(currentValue === city ? "" : currentValue)
                                                                setOpenCity(false)
                                                            }}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4", city === c.value ? "opacity-100" : "opacity-0")} />
                                                            {c.label}
                                                        </CommandItem>
                                                    ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Shop Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-pink-700">Shop</label>
                            <Popover open={openShop} onOpenChange={setOpenShop}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openShop}
                                        className="w-full justify-between border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        disabled={!city}
                                    >
                                        {shop ? shops.find((s) => s.value === shop)?.label : "Select shop..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search shop..." />
                                        <CommandList>
                                            <CommandEmpty>No shop found.</CommandEmpty>
                                            <CommandGroup>
                                                {shops
                                                    .filter((s) => !city || s.city === city)
                                                    .map((s) => (
                                                        <CommandItem
                                                            key={s.value}
                                                            value={s.value}
                                                            onSelect={(currentValue) => {
                                                                setShop(currentValue === shop ? "" : currentValue)
                                                                setOpenShop(false)
                                                            }}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4", shop === s.value ? "opacity-100" : "opacity-0")} />
                                                            {s.label}
                                                        </CommandItem>
                                                    ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>
                {/* Time Period Card with the new design */}
                <Card className="overflow-hidden border-pink-100">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                        <CardTitle className="text-pink-700">Time Period</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {/* Day input */}
                                <div className="space-y-2">
                                    <Label htmlFor="day-input" className="text-pink-700 capitalize">
                                        day
                                    </Label>
                                    <Select value={day} onValueChange={setDay}>
                                        <SelectTrigger
                                            id="day-input"
                                            className="border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        >
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">Any day</SelectItem>
                                            {days.map((d) => (
                                                <SelectItem key={d.value} value={d.value}>
                                                    {d.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Month input */}
                                <div className="space-y-2">
                                    <Label htmlFor="month-input" className="text-pink-700 capitalize">
                                        month
                                    </Label>
                                    <Select value={month} onValueChange={setMonth}>
                                        <SelectTrigger
                                            id="month-input"
                                            className="border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        >
                                            <SelectValue placeholder="Select month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="any">Any month</SelectItem>
                                            {months.map((m) => (
                                                <SelectItem key={m.value} value={m.value}>
                                                    {m.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Year input */}
                                <div className="space-y-2">
                                    <Label htmlFor="year-input" className="text-pink-700 capitalize">
                                        year
                                    </Label>
                                    <Select value={year} onValueChange={setYear}>
                                        <SelectTrigger
                                            id="year-input"
                                            className="border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        >
                                            <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.map((y) => (
                                                <SelectItem key={y.value} value={y.value}>
                                                    {y.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Clear filters button */}
                                {(day || month || year !== "2023") && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleClearTimeFilter}
                                        className="text-pink-500 hover:text-pink-700 hover:bg-pink-50"
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Clear time filters
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Column 3: Product */}
                <Card className="border-pink-100">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                        <CardTitle className="text-pink-700">Product</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Category Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-pink-700">Category</label>
                            <Popover open={openCategory} onOpenChange={setOpenCategory}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openCategory}
                                        className="w-full justify-between border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                    >
                                        {category ? productCategories.find((c) => c.value === category)?.label : "Select category..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search category..." />
                                        <CommandList>
                                            <CommandEmpty>No category found.</CommandEmpty>
                                            <CommandGroup>
                                                {productCategories.map((c) => (
                                                    <CommandItem
                                                        key={c.value}
                                                        value={c.value}
                                                        onSelect={(currentValue) => {
                                                            setCategory(currentValue === category ? "" : currentValue)
                                                            setOpenCategory(false)
                                                        }}
                                                    >
                                                        <Check className={cn("mr-2 h-4 w-4", category === c.value ? "opacity-100" : "opacity-0")} />
                                                        {c.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Product Selector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-pink-700">Product</label>
                            <Popover open={openProduct} onOpenChange={setOpenProduct}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openProduct}
                                        className="w-full justify-between border-pink-200 hover:border-pink-400 focus:border-pink-500"
                                        disabled={!category}
                                    >
                                        {product && category
                                            ? products[category as keyof typeof products]?.find((p) => p.value === product)?.label
                                            : "Select product..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search product..." />
                                        <CommandList>
                                            <CommandEmpty>No product found.</CommandEmpty>
                                            <CommandGroup>
                                                {category &&
                                                    products[category as keyof typeof products]?.map((p) => (
                                                        <CommandItem
                                                            key={p.value}
                                                            value={p.value}
                                                            onSelect={(currentValue) => {
                                                                setProduct(currentValue === product ? "" : currentValue)
                                                                setOpenProduct(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn("mr-2 h-4 w-4", product === p.value ? "opacity-100" : "opacity-0")}
                                                            />
                                                            {p.label}
                                                        </CommandItem>
                                                    ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data table - only show when filters are active */}
            {hasActiveFilters ? (
                <Card className="border-pink-100">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                        <CardTitle className="text-pink-700">Results ({filteredData.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Sales data based on selected filters</TableCaption>
                            <TableHeader>
                                <TableRow className="bg-pink-50">
                                    <TableHead className="text-pink-700">Date</TableHead>
                                    <TableHead className="text-pink-700">Country</TableHead>
                                    <TableHead className="text-pink-700">City</TableHead>
                                    <TableHead className="text-pink-700">Category</TableHead>
                                    <TableHead className="text-pink-700">Product</TableHead>
                                    <TableHead className="text-right text-pink-700">Total Quantity</TableHead>
                                    <TableHead className="text-right text-pink-700">Revenue (USD)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <TableRow key={index} className="hover:bg-pink-50">
                                            <TableCell>{format(item.Date, "MMM d, yyyy")}</TableCell>
                                            <TableCell>{cityToCountry[item.City as keyof typeof cityToCountry]}</TableCell>
                                            <TableCell>{item.City}</TableCell>
                                            <TableCell>{item.ProductCategory}</TableCell>
                                            <TableCell>{item.Product}</TableCell>
                                            <TableCell className="text-right">{item.TotalQuantity.toLocaleString()}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                $
                                                {item.Revenue.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center text-pink-500">
                                            No data matching the selected filters
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card className="border-pink-100 text-center p-10">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-pink-50 p-6">
                            <ChevronsUpDown className="h-10 w-10 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-medium text-pink-700">Select Filters to View Data</h3>
                        <p className="text-pink-500 max-w-md">
                            Please select at least one filter from the options above to display the sales data.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    )
}
