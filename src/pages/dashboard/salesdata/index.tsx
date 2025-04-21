"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios"

// Update the SalesDataItem interface to include TotalQuantity
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
    const fetchData = async () => {
        try {
            const res = await axios.post("/api/salesdata/data.ts")
            if (res.status === 200) {
                setItems(res.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const countries = Array.from(new Set(items.map((item) => item.Country))).map((country) => ({
        label: country,
        value: country.toLowerCase().replace(/\s+/g, "_"),
    }))

    const cities = Array.from(new Set(items.map((item) => item.City))).map((city) => ({
        label: city,
        value: city.toLowerCase().replace(/\s+/g, "_"),
        country: items
            .find((item) => item.City === city)
            ?.Country.toLowerCase()
            .replace(/\s+/g, "_"),
    }))

    const shops = Array.from(new Set(items.map((item) => item.Shop))).map((shop) => ({
        label: shop,
        value: shop.toLowerCase().replace(/\s+/g, "_"),
        city: items
            .find((item) => item.Shop === shop)
            ?.City.toLowerCase()
            .replace(/\s+/g, "_"),
    }))

    const categories = Array.from(new Set(items.map((item) => item.Category))).map((category) => ({
        label: category,
        value: category.toLowerCase().replace(/\s+/g, "_"),
    }))

    // Create a map of pizzas by category
    const pizzasByCategory: Record<string, { label: string; value: string }[]> = {}
    categories.forEach((category) => {
        const pizzasInCategory = items.filter((item) => item.Category === category.label).map((item) => item.Pizza)

        pizzasByCategory[category.value] = Array.from(new Set(pizzasInCategory)).map((pizza) => ({
            label: pizza,
            value: pizza.toLowerCase().replace(/\s+/g, "_"),
        }))
    })

    // Create a reference to pizzasByCategory for the UI
    const productCategories = categories
    const products = pizzasByCategory

    // Create months array
    const months = [
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ]

    // Create years array
    const years = Array.from(new Set(items.map((item) => item.Year))).map((year) => ({
        label: year.toString(),
        value: year.toString(),
    }))

    // Create days array (1-31)
    const days = Array.from({ length: 31 }, (_, i) => {
        const day = i + 1
        return { label: day.toString(), value: day.toString() }
    })

    // Filter states
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [shop, setShop] = useState("")
    const [dateType, setDateType] = useState<"day" | "month" | "year">("day")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState(years[0]?.value || "2015")
    const [category, setCategory] = useState("")
    const [product, setProduct] = useState("")
    const [view, setView] = useState<"table" | "summary">("table")

    // Popover states
    const [openCountry, setOpenCountry] = useState(false)
    const [openCity, setOpenCity] = useState(false)
    const [openShop, setOpenShop] = useState(false)
    const [openCategory, setOpenCategory] = useState(false)
    const [openProduct, setOpenProduct] = useState(false)

    // Filtered data state
    const [filteredData, setFilteredData] = useState<SalesDataItem[]>([])
    const [hasActiveFilters, setHasActiveFilters] = useState(false)

    // Available cities based on selected country
    const [availableCities, setAvailableCities] =
        useState<{ label: string; value: string; country: string | undefined }[]>(cities)

    // Available shops based on selected city
    const [availableShops, setAvailableShops] =
        useState<{ label: string; value: string; city: string | undefined }[]>(shops)

    // Available pizzas based on selected category
    const [availablePizzas, setAvailablePizzas] = useState<{ label: string; value: string }[]>([])

    // Format date helper
    const formatDate = (day: number, month: number, year: number) => {
        const date = new Date(year, month - 1, day)
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    }

    // Format month name helper
    const formatMonthName = (month: number) => {
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
        return monthNames[month - 1]
    }

    // Reset city when country changes
    useEffect(() => {
        setCity("")
        setShop("")

        if (country) {
            const filteredCities = cities.filter((c) => c.country === country)
            setAvailableCities(filteredCities)
        } else {
            setAvailableCities(cities)
        }
    }, [country])

    // Reset shop when city changes and update available shops
    useEffect(() => {
        setShop("")

        if (city) {
            const filteredShops = shops.filter((s) => s.city === city)
            setAvailableShops(filteredShops)
        } else {
            setAvailableShops(shops)
        }
    }, [city])

    // Reset pizza when category changes and update available pizzas
    useEffect(() => {
        setProduct("")

        if (category && pizzasByCategory[category]) {
            setAvailablePizzas(pizzasByCategory[category])
        } else {
            setAvailablePizzas([])
        }
    }, [category])

    // Reset date filters when dateType changes
    useEffect(() => {
        setDay("")
        setMonth("")
        if (dateType === "year") {
            setMonth("")
        }
    }, [dateType])

    // Clear time filter function
    const clearTimeFilter = () => {
        setDay("")
        setMonth("")
        if (dateType !== "year") {
            setYear(years[0]?.value || "2015")
        }
    }

    // Reset all filters function
    const resetAllFilters = () => {
        // Reset location filters
        setCountry("")
        setCity("")
        setShop("")

        // Reset date filters
        setDay("")
        setMonth("")
        setYear(years[0]?.value || "2015")

        // Reset product filters
        setCategory("")
        setProduct("")
    }

    // Effect to check if any filters are active
    useEffect(() => {
        const isAnyFilterActive = !!(
            country ||
            city ||
            shop ||
            day ||
            month ||
            (year && year !== years[0]?.value) ||
            category ||
            product
        )
        setHasActiveFilters(isAnyFilterActive)
    }, [country, city, shop, day, month, year, category, product])

    // Effect to filter data based on all filters
    useEffect(() => {
        // Only filter and set data when filters are active
        if (hasActiveFilters) {
            // Start with all data
            let result = [...items]

            // Apply location filters
            if (country) {
                const countryLabel = countries.find((c) => c.value === country)?.label
                result = result.filter((item) => item.Country === countryLabel)
            }

            if (city) {
                const cityLabel = cities.find((c) => c.value === city)?.label
                result = result.filter((item) => item.City === cityLabel)
            }

            if (shop) {
                const shopLabel = shops.find((s) => s.value === shop)?.label
                result = result.filter((item) => item.Shop === shopLabel)
            }

            // Apply date filters
            if (day) {
                result = result.filter((item) => item.Day === Number.parseInt(day))
            }

            if (month) {
                result = result.filter((item) => item.Month === Number.parseInt(month))
            }

            if (year) {
                result = result.filter((item) => item.Year === Number.parseInt(year))
            }

            // Apply product filters
            if (category) {
                const categoryLabel = categories.find((c) => c.value === category)?.label
                result = result.filter((item) => item.Category === categoryLabel)
            }

            if (product) {
                const pizzaLabel = availablePizzas.find((p) => p.value === product)?.label
                result = result.filter((item) => item.Pizza === pizzaLabel)
            }

            setFilteredData(result)
        } else {
            // If no filters are active, set filteredData to empty array
            setFilteredData([])
        }
    }, [country, city, shop, day, month, year, category, product, hasActiveFilters])

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-pink-600">Sales Data Management</h1>
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        onClick={resetAllFilters}
                        className="border-pink-200 hover:border-pink-400 hover:bg-pink-50 text-pink-600"
                    >
                        <X className="h-4 w-4 mr-2" />
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
                                        disabled={!city || availableShops.length === 0}
                                    >
                                        {shop ? availableShops.find((s) => s.value === shop)?.label : "Select shop..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search shop..." />
                                        <CommandList>
                                            <CommandEmpty>No shop found.</CommandEmpty>
                                            <CommandGroup>
                                                {availableShops.map((s) => (
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

                {/* Column 2: Date */}
                <Card className="overflow-hidden border-pink-100">
                    <CardHeader className="bg-gradient-to-r from-pink-50 to-white">
                        <CardTitle className="text-pink-700">Time Period</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {/* Time Period Tabs */}
                            <div className="flex rounded-md overflow-hidden">
                                <Button
                                    variant={dateType === "day" ? "default" : "ghost"}
                                    onClick={() => setDateType("day")}
                                    className={`flex-1 rounded-none ${
                                        dateType === "day"
                                            ? "bg-pink-600 hover:bg-pink-700 text-white"
                                            : "bg-pink-50 hover:bg-pink-100 text-gray-700"
                                    }`}
                                >
                                    Day
                                </Button>
                                <Button
                                    variant={dateType === "month" ? "default" : "ghost"}
                                    onClick={() => setDateType("month")}
                                    className={`flex-1 rounded-none ${
                                        dateType === "month"
                                            ? "bg-pink-600 hover:bg-pink-700 text-white"
                                            : "bg-pink-50 hover:bg-pink-100 text-gray-700"
                                    }`}
                                >
                                    Month
                                </Button>
                                <Button
                                    variant={dateType === "year" ? "default" : "ghost"}
                                    onClick={() => setDateType("year")}
                                    className={`flex-1 rounded-none ${
                                        dateType === "year"
                                            ? "bg-pink-600 hover:bg-pink-700 text-white"
                                            : "bg-pink-50 hover:bg-pink-100 text-gray-700"
                                    }`}
                                >
                                    Year
                                </Button>
                            </div>

                            {/* Date Selectors */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label className="text-pink-700">Day</Label>
                                    <Select value={day} onValueChange={setDay} disabled={dateType !== "day"}>
                                        <SelectTrigger className="border-pink-200">
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {days.map((d) => (
                                                <SelectItem key={d.value} value={d.value}>
                                                    {d.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-pink-700">Month</Label>
                                    <Select value={month} onValueChange={setMonth} disabled={dateType === "year"}>
                                        <SelectTrigger className="border-pink-200">
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {months.map((m) => (
                                                <SelectItem key={m.value} value={m.value}>
                                                    {m.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="text-pink-700">Year</Label>
                                    <Select value={year} onValueChange={setYear}>
                                        <SelectTrigger className="border-pink-200">
                                            <SelectValue placeholder="2015" />
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
                            </div>

                            {/* Clear filter button - show when any date filter is active */}
                            {(day || month) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearTimeFilter}
                                    className="text-pink-500 hover:text-pink-700 hover:bg-pink-50"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Clear date filter
                                </Button>
                            )}
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
                                            ? products[category]?.find((p) => p.value === product)?.label
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
                                                    products[category]?.map((p) => (
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
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-pink-700">Results</CardTitle>
                            {filteredData.length > 0 && (
                                <div className="flex space-x-4 text-sm text-pink-600">
                                    <div>
                                        Total Quantity: {filteredData.reduce((sum, item) => sum + item.TotalQuantity, 0).toLocaleString()}
                                    </div>
                                    <div>
                                        Total Revenue: $
                                        {filteredData
                                            .reduce((sum, item) => sum + item.Revenue, 0)
                                            .toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Sales data based on selected filters</TableCaption>
                            <TableHeader>
                                <TableRow className="bg-pink-50">
                                    {dateType === "year" ? (
                                        <>
                                            <TableHead className="text-pink-700 w-1/6">Year</TableHead>
                                            <TableHead className="text-pink-700 w-1/5">Shop</TableHead>
                                            <TableHead className="text-pink-700 w-1/5">Category</TableHead>
                                            <TableHead className="text-pink-700 w-1/5">Pizza</TableHead>
                                            <TableHead className="text-pink-700 w-1/6">Quantity</TableHead>
                                            <TableHead className="text-right text-pink-700 w-1/6">Revenue (USD)</TableHead>
                                        </>
                                    ) : dateType === "month" ? (
                                        <>
                                            <TableHead className="text-pink-700 w-1/7">Month</TableHead>
                                            <TableHead className="text-pink-700 w-1/7">Year</TableHead>
                                            <TableHead className="text-pink-700 w-1/7">Shop</TableHead>
                                            <TableHead className="text-pink-700 w-1/7">Category</TableHead>
                                            <TableHead className="text-pink-700 w-1/7">Pizza</TableHead>
                                            <TableHead className="text-pink-700 w-1/7">Quantity</TableHead>
                                            <TableHead className="text-right text-pink-700 w-1/7">Revenue (USD)</TableHead>
                                        </>
                                    ) : (
                                        <>
                                            <TableHead className="text-pink-700">Date</TableHead>
                                            <TableHead className="text-pink-700">Country</TableHead>
                                            <TableHead className="text-pink-700">City</TableHead>
                                            <TableHead className="text-pink-700">Shop</TableHead>
                                            <TableHead className="text-pink-700">Category</TableHead>
                                            <TableHead className="text-pink-700">Pizza</TableHead>
                                            <TableHead className="text-pink-700">Quantity</TableHead>
                                            <TableHead className="text-right text-pink-700">Revenue (USD)</TableHead>
                                        </>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dateType === "year" ? (
                                    filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <TableRow key={index} className="hover:bg-pink-50">
                                                <TableCell className="font-medium">{item.Year}</TableCell>
                                                <TableCell>{item.Shop}</TableCell>
                                                <TableCell>{item.Category}</TableCell>
                                                <TableCell>{item.Pizza}</TableCell>
                                                <TableCell>{item.TotalQuantity}</TableCell>
                                                <TableCell className="text-right font-medium">${item.Revenue.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center text-pink-500">
                                                No data matching the selected filters
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : dateType === "month" ? (
                                    filteredData.length > 0 ? (
                                        filteredData.map((item, index) => (
                                            <TableRow key={index} className="hover:bg-pink-50">
                                                <TableCell>{formatMonthName(item.Month)}</TableCell>
                                                <TableCell>{item.Year}</TableCell>
                                                <TableCell>{item.Shop}</TableCell>
                                                <TableCell>{item.Category}</TableCell>
                                                <TableCell>{item.Pizza}</TableCell>
                                                <TableCell>{item.TotalQuantity}</TableCell>
                                                <TableCell className="text-right font-medium">${item.Revenue.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center text-pink-500">
                                                No data matching the selected filters
                                            </TableCell>
                                        </TableRow>
                                    )
                                ) : filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <TableRow key={index} className="hover:bg-pink-50">
                                            <TableCell className="whitespace-nowrap">{formatDate(item.Day, item.Month, item.Year)}</TableCell>
                                            <TableCell>{item.Country}</TableCell>
                                            <TableCell>{item.City}</TableCell>
                                            <TableCell>{item.Shop}</TableCell>
                                            <TableCell>{item.Category}</TableCell>
                                            <TableCell>{item.Pizza}</TableCell>
                                            <TableCell>{item.TotalQuantity}</TableCell>
                                            <TableCell className="text-right font-medium">${item.Revenue.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-pink-500">
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
