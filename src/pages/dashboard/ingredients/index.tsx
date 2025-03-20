"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Filter, Edit, Trash2, Plus, DollarSign, Scale } from 'lucide-react'
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types
interface Ingredient {
    id: number
    name: string
    category: string
    stock: number
    unit: string
    costPerUnit: number
    status: "In Stock" | "Low Stock" | "Out of Stock"
}

export default function IngredientsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [currentIngredient, setCurrentIngredient] = useState<Ingredient | null>(null)
    const [newIngredient, setNewIngredient] = useState({
        name: "",
        category: "dairy",
        stock: 0,
        unit: "kg",
        costPerUnit: 0,
    })

    // Sample data
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        {
            id: 1,
            name: "Mozzarella Cheese",
            category: "Dairy",
            stock: 45,
            unit: "kg",
            costPerUnit: 8.5,
            status: "In Stock"
        },
        {
            id: 2,
            name: "Tomato Sauce",
            category: "Sauce",
            stock: 32,
            unit: "liter",
            costPerUnit: 3.25,
            status: "In Stock"
        },
        {
            id: 3,
            name: "Pepperoni",
            category: "Meat",
            stock: 12,
            unit: "kg",
            costPerUnit: 12.75,
            status: "Low Stock"
        },
        {
            id: 4,
            name: "Mushrooms",
            category: "Vegetable",
            stock: 8,
            unit: "kg",
            costPerUnit: 6.5,
            status: "Low Stock"
        },
        {
            id: 5,
            name: "Black Olives",
            category: "Vegetable",
            stock: 0,
            unit: "kg",
            costPerUnit: 7.25,
            status: "Out of Stock"
        },
        {
            id: 6,
            name: "Bell Peppers",
            category: "Vegetable",
            stock: 15,
            unit: "kg",
            costPerUnit: 4.5,
            status: "In Stock"
        },
        {
            id: 7,
            name: "Basil",
            category: "Herb",
            stock: 3,
            unit: "kg",
            costPerUnit: 15.0,
            status: "Low Stock"
        },
        {
            id: 8,
            name: "Flour",
            category: "Baking",
            stock: 50,
            unit: "kg",
            costPerUnit: 1.75,
            status: "In Stock"
        },
        {
            id: 9,
            name: "Olive Oil",
            category: "Oil",
            stock: 18,
            unit: "liter",
            costPerUnit: 9.99,
            status: "In Stock"
        },
        {
            id: 10,
            name: "Garlic",
            category: "Herb",
            stock: 5,
            unit: "kg",
            costPerUnit: 8.25,
            status: "Low Stock"
        },
    ])

    // Filter ingredients based on search query
    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ingredient.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Add new ingredient
    const handleAddIngredient = () => {
        const status =
            newIngredient.stock === 0
                ? "Out of Stock"
                : newIngredient.stock < 10
                    ? "Low Stock"
                    : "In Stock"

        const ingredient: Ingredient = {
            id: Math.max(...ingredients.map(i => i.id), 0) + 1,
            name: newIngredient.name,
            category: newIngredient.category.charAt(0).toUpperCase() + newIngredient.category.slice(1),
            stock: newIngredient.stock,
            unit: newIngredient.unit,
            costPerUnit: newIngredient.costPerUnit,
            status: status as "In Stock" | "Low Stock" | "Out of Stock"
        }

        setIngredients([...ingredients, ingredient])
        setNewIngredient({
            name: "",
            category: "dairy",
            stock: 0,
            unit: "kg",
            costPerUnit: 0,
        })
        setIsAddDialogOpen(false)
    }

    // Edit ingredient
    const handleEditIngredient = () => {
        if (!currentIngredient) return

        const status =
            currentIngredient.stock === 0
                ? "Out of Stock"
                : currentIngredient.stock < 10
                    ? "Low Stock"
                    : "In Stock"

        const updatedIngredient = {
            ...currentIngredient,
            status: status as "In Stock" | "Low Stock" | "Out of Stock"
        }

        setIngredients(ingredients.map(ing =>
            ing.id === currentIngredient.id ? updatedIngredient : ing
        ))
        setIsEditDialogOpen(false)
    }

    // Delete ingredient
    const handleDeleteIngredient = () => {
        if (!currentIngredient) return
        setIngredients(ingredients.filter(ing => ing.id !== currentIngredient.id))
        setIsDeleteDialogOpen(false)
    }

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
            case "Low Stock":
                return "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400"
            case "Out of Stock":
                return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Ingredients</h2>
                        <p className="text-muted-foreground">Manage your ingredient inventory</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4"/>
                            Filter
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4"/>
                            Add Ingredient
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Ingredient Management</CardTitle>
                            <CardDescription>You have {filteredIngredients.length} ingredients in total</CardDescription>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                            <Input
                                type="search"
                                placeholder="Search ingredients..."
                                className="pl-8 w-full sm:w-[300px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Cost Per Unit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredIngredients.length > 0 ? (
                                    filteredIngredients.map((ingredient) => (
                                        <TableRow key={ingredient.id}>
                                            <TableCell className="font-medium">{ingredient.name}</TableCell>
                                            <TableCell>{ingredient.category}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Scale className="h-4 w-4 text-muted-foreground"/>
                                                    {ingredient.stock}
                                                </div>
                                            </TableCell>
                                            <TableCell>{ingredient.unit}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <DollarSign className="h-4 w-4 text-muted-foreground"/>
                                                    {ingredient.costPerUnit.toFixed(2)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={getStatusColor(ingredient.status)}
                                                >
                                                    {ingredient.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4"/>
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => {
                                                            setCurrentIngredient(ingredient)
                                                            setIsEditDialogOpen(true)
                                                        }}>
                                                            <Edit className="mr-2 h-4 w-4"/>
                                                            Edit ingredient
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => {
                                                            setCurrentIngredient(ingredient)
                                                            setIsDeleteDialogOpen(true)
                                                        }}>
                                                            <Trash2 className="mr-2 h-4 w-4"/>
                                                            Delete ingredient
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No ingredients found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Add Ingredient Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Ingredient</DialogTitle>
                        <DialogDescription>
                            Enter the details of the new ingredient to add to your inventory.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={newIngredient.name}
                                onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select
                                value={newIngredient.category}
                                onValueChange={(value) => setNewIngredient({ ...newIngredient, category: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dairy">Dairy</SelectItem>
                                    <SelectItem value="meat">Meat</SelectItem>
                                    <SelectItem value="vegetable">Vegetable</SelectItem>
                                    <SelectItem value="sauce">Sauce</SelectItem>
                                    <SelectItem value="herb">Herb</SelectItem>
                                    <SelectItem value="baking">Baking</SelectItem>
                                    <SelectItem value="oil">Oil</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">
                                Stock
                            </Label>
                            <Input
                                id="stock"
                                type="number"
                                value={newIngredient.stock}
                                onChange={(e) => setNewIngredient({ ...newIngredient, stock: Number(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit" className="text-right">
                                Unit
                            </Label>
                            <Select
                                value={newIngredient.unit}
                                onValueChange={(value) => setNewIngredient({ ...newIngredient, unit: value })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="kg">Kilogram (kg)</SelectItem>
                                    <SelectItem value="g">Gram (g)</SelectItem>
                                    <SelectItem value="liter">Liter (L)</SelectItem>
                                    <SelectItem value="ml">Milliliter (ml)</SelectItem>
                                    <SelectItem value="unit">Unit (pcs)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cost" className="text-right">
                                Cost Per Unit
                            </Label>
                            <Input
                                id="cost"
                                type="number"
                                step="0.01"
                                value={newIngredient.costPerUnit}
                                onChange={(e) => setNewIngredient({ ...newIngredient, costPerUnit: Number(e.target.value) })}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Ingredient Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit Ingredient</DialogTitle>
                        <DialogDescription>
                            Update the details of this ingredient.
                        </DialogDescription>
                    </DialogHeader>
                    {currentIngredient && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={currentIngredient.name}
                                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">
                                    Category
                                </Label>
                                <Select
                                    value={currentIngredient.category.toLowerCase()}
                                    onValueChange={(value) => setCurrentIngredient({
                                        ...currentIngredient,
                                        category: value.charAt(0).toUpperCase() + value.slice(1)
                                    })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dairy">Dairy</SelectItem>
                                        <SelectItem value="meat">Meat</SelectItem>
                                        <SelectItem value="vegetable">Vegetable</SelectItem>
                                        <SelectItem value="sauce">Sauce</SelectItem>
                                        <SelectItem value="herb">Herb</SelectItem>
                                        <SelectItem value="baking">Baking</SelectItem>
                                        <SelectItem value="oil">Oil</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-stock" className="text-right">
                                    Stock
                                </Label>
                                <Input
                                    id="edit-stock"
                                    type="number"
                                    value={currentIngredient.stock}
                                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, stock: Number(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-unit" className="text-right">
                                    Unit
                                </Label>
                                <Select
                                    value={currentIngredient.unit}
                                    onValueChange={(value) => setCurrentIngredient({ ...currentIngredient, unit: value })}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                                        <SelectItem value="g">Gram (g)</SelectItem>
                                        <SelectItem value="liter">Liter (L)</SelectItem>
                                        <SelectItem value="ml">Milliliter (ml)</SelectItem>
                                        <SelectItem value="unit">Unit (pcs)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-cost" className="text-right">
                                    Cost Per Unit
                                </Label>
                                <Input
                                    id="edit-cost"
                                    type="number"
                                    step="0.01"
                                    value={currentIngredient.costPerUnit}
                                    onChange={(e) => setCurrentIngredient({ ...currentIngredient, costPerUnit: Number(e.target.value) })}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditIngredient}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the ingredient &quot;{currentIngredient?.name}&quot; from your inventory.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteIngredient} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardLayout>
    )
}
