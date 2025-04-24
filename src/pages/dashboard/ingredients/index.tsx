"use client"

import {useEffect, useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Edit, Filter, ImageIcon, MoreHorizontal, Plus, Search, Trash2} from 'lucide-react'
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {format} from "date-fns";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import axios from "axios";

// Types
interface Ingredient {
    id: number
    name: string
    description: string
    createdAt: string
    image: string
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

    console.log(isEditDialogOpen)
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    // Sample data

    const formatted = (date :string) => {
        return format(new Date(date), "dd/MM/yyyy");
    }

    const handleAddIngredient = () => {

        setIsAddDialogOpen(false)
    }

    // Edit ingredient
    // const handleEditIngredient = () => {
    //     if (!currentIngredient) return
    //
    //     setIsEditDialogOpen(false)
    // }

    const fetchIngredients = async () => {
        try {
            const res = await axios.get("/api/ingredient/get-all");
            if(res.status === 200) {
                setIngredients(res.data.data)
            }
        } catch (err) {
            console.error("Error fetching ingredients:", err);
        }
    }

    // Delete ingredient
    const handleDeleteIngredient = async () => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete("/api/ingredient/by-id/delete", {
                headers: {
                    Authorization: `${token}`,
                },
                data: {
                    id: currentIngredient?.id,
                },
            });
            fetchIngredients();
        } catch (e) {
            console.error("Error fetching ingredients:", e);
        } finally {
            setIsDeleteDialogOpen(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, [])
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Ingredients</h2>
                        <p className="text-muted-foreground">Manage your ingredient inventory</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90"
                                onClick={() => setIsAddDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4"/>
                            Add Ingredient
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Ingredient Management</CardTitle>
                            <CardDescription>You have {ingredients.length} ingredients in
                                total</CardDescription>
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
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Create At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                { ingredients.length > 0 ? (
                                    ingredients.map((ingredient) => (
                                        <TableRow key={ingredient.id}>
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                                    {ingredient.image ? (
                                                        <Image
                                                            src={ingredient.image || "/placeholder.svg"}
                                                            alt={ingredient.name}
                                                            className="object-cover rounded-md"
                                                            width={600}
                                                            height={800}
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-5 w-5 text-muted-foreground"/>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{ingredient.name}</TableCell>
                                            <TableCell className="text-justify">{ingredient.description}</TableCell>
                                            <TableCell className="w-32"> {formatted(ingredient.createdAt)}</TableCell>
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
            <Dialog open={false} onOpenChange={setIsAddDialogOpen}>
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
                                onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select
                                value={newIngredient.category}
                                onValueChange={(value) => setNewIngredient({...newIngredient, category: value})}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select category"/>
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
                                onChange={(e) => setNewIngredient({...newIngredient, stock: Number(e.target.value)})}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit" className="text-right">
                                Unit
                            </Label>
                            <Select
                                value={newIngredient.unit}
                                onValueChange={(value) => setNewIngredient({...newIngredient, unit: value})}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select unit"/>
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
                                onChange={(e) => setNewIngredient({
                                    ...newIngredient,
                                    costPerUnit: Number(e.target.value)
                                })}
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

            {/*/!* Edit Ingredient Dialog *!/*/}
            {/*<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>*/}
            {/*    <DialogContent className="sm:max-w-[500px]">*/}
            {/*        <DialogHeader>*/}
            {/*            <DialogTitle>Edit Ingredient</DialogTitle>*/}
            {/*            <DialogDescription>*/}
            {/*                Update the details of this ingredient.*/}
            {/*            </DialogDescription>*/}
            {/*        </DialogHeader>*/}
            {/*        {currentIngredient && (*/}
            {/*            <div className="grid gap-4 py-4">*/}
            {/*                <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*                    <Label htmlFor="edit-name" className="text-right">*/}
            {/*                        Name*/}
            {/*                    </Label>*/}
            {/*                    <Input*/}
            {/*                        id="edit-name"*/}
            {/*                        value={currentIngredient.name}*/}
            {/*                        onChange={(e) => setCurrentIngredient({ ...currentIngredient, name: e.target.value })}*/}
            {/*                        className="col-span-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*                    <Label htmlFor="edit-category" className="text-right">*/}
            {/*                        Category*/}
            {/*                    </Label>*/}
            {/*                    <Select*/}
            {/*                        value={currentIngredient.category.toLowerCase()}*/}
            {/*                        onValueChange={(value) => setCurrentIngredient({*/}
            {/*                            ...currentIngredient,*/}
            {/*                            category: value.charAt(0).toUpperCase() + value.slice(1)*/}
            {/*                        })}*/}
            {/*                    >*/}
            {/*                        <SelectTrigger className="col-span-3">*/}
            {/*                            <SelectValue placeholder="Select category" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="dairy">Dairy</SelectItem>*/}
            {/*                            <SelectItem value="meat">Meat</SelectItem>*/}
            {/*                            <SelectItem value="vegetable">Vegetable</SelectItem>*/}
            {/*                            <SelectItem value="sauce">Sauce</SelectItem>*/}
            {/*                            <SelectItem value="herb">Herb</SelectItem>*/}
            {/*                            <SelectItem value="baking">Baking</SelectItem>*/}
            {/*                            <SelectItem value="oil">Oil</SelectItem>*/}
            {/*                            <SelectItem value="other">Other</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}
            {/*                <div className="grid grid-cols-4 items-center gap-4">*/}

            {/*                </div>*/}
            {/*                <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*                    <Label htmlFor="edit-unit" className="text-right">*/}
            {/*                        Unit*/}
            {/*                    </Label>*/}
            {/*                    <Select*/}
            {/*                        value={currentIngredient.unit}*/}
            {/*                        onValueChange={(value) => setCurrentIngredient({ ...currentIngredient, unit: value })}*/}
            {/*                    >*/}
            {/*                        <SelectTrigger className="col-span-3">*/}
            {/*                            <SelectValue placeholder="Select unit" />*/}
            {/*                        </SelectTrigger>*/}
            {/*                        <SelectContent>*/}
            {/*                            <SelectItem value="kg">Kilogram (kg)</SelectItem>*/}
            {/*                            <SelectItem value="g">Gram (g)</SelectItem>*/}
            {/*                            <SelectItem value="liter">Liter (L)</SelectItem>*/}
            {/*                            <SelectItem value="ml">Milliliter (ml)</SelectItem>*/}
            {/*                            <SelectItem value="unit">Unit (pcs)</SelectItem>*/}
            {/*                        </SelectContent>*/}
            {/*                    </Select>*/}
            {/*                </div>*/}
            {/*                <div className="grid grid-cols-4 items-center gap-4">*/}
            {/*                    <Label htmlFor="edit-cost" className="text-right">*/}
            {/*                        Cost Per Unit*/}
            {/*                    </Label>*/}
            {/*                    <Input*/}
            {/*                        id="edit-cost"*/}
            {/*                        type="number"*/}
            {/*                        step="0.01"*/}
            {/*                        value={currentIngredient.costPerUnit}*/}
            {/*                        onChange={(e) => setCurrentIngredient({ ...currentIngredient, costPerUnit: Number(e.target.value) })}*/}
            {/*                        className="col-span-3"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        <DialogFooter>*/}
            {/*            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>*/}
            {/*                Cancel*/}
            {/*            </Button>*/}
            {/*            <Button onClick={handleEditIngredient}>Save Changes</Button>*/}
            {/*        </DialogFooter>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}

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
                        <AlertDialogAction onClick= {handleDeleteIngredient} className="bg-red-500 hover:bg-red-600">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardLayout>
    )
}
