"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, Pizza, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Stepper, Step, StepDescription, StepTitle } from "@/components/ui/stepper"

interface Category {
    id: string
    name: string
}

interface PizzaResponse {
    data: {
        id: string
        name: string
        description: string
        createdAt: string
        updatedAt: string
    }
    statusCode: number
}

interface PizzaSizeResponse {
    data: {
        id: string
        pizzaId: number
        size: string
        price: string
        pizzaNameID: string
        image: string
        createdAt: string
        updatedAt: string
    }
    statusCode: number
}

interface PizzaImageResponse {
    data: {
        id: string
        src: string
        alt: string
        createdAt: string
        updatedAt: string
    }
    statusCode: number
}

export default function PizzaUpload() {
    const { toast } = useToast()
    const [currentStep, setCurrentStep] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    // Pizza creation form state
    const [pizzaForm, setPizzaForm] = useState({
        name: "",
        categoryID: "",
        description: "",
    })

    // Pizza size form state
    const [sizeForm, setSizeForm] = useState({
        size: "M",
        price: "",
        pizzaId: "",
    })

    // Pizza image form state
    const [imageForm, setImageForm] = useState({
        pizzaId: "",
        src: "https://i.imgur.com/EzDAxME.png",
        alt: "",
    })

    // Sample categories - in a real app, these would be fetched from an API
    const categories: Category[] = [
        { id: "21", name: "Classic" },
        { id: "22", name: "Specialty" },
        { id: "23", name: "Vegetarian" },
        { id: "24", name: "Meat Lovers" },
    ]

    // Handle pizza form input changes
    const handlePizzaInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setPizzaForm((prev) => ({ ...prev, [name]: value }))
    }

    // Handle size form input changes
    const handleSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSizeForm((prev) => ({ ...prev, [name]: value }))
    }

    // Handle image form input changes
    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setImageForm((prev) => ({ ...prev, [name]: value }))
    }

    // Handle category selection
    const handleCategoryChange = (value: string) => {
        setPizzaForm((prev) => ({ ...prev, categoryID: value }))
    }

    // Handle size selection
    const handleSizeChange = (value: string) => {
        setSizeForm((prev) => ({ ...prev, size: value }))
    }

    // Step 1: Create pizza
    const createPizza = async () => {
        setIsLoading(true)
        setError(null)
        const token = localStorage.getItem("token")

        try {
            const response = await axios.post<PizzaResponse>("/api/pizza", pizzaForm, {
                headers: {
                    Authorization: token,
                },
            })
            if (response.data.statusCode === 200) {
                const pizzaId = response.data.data.id

                // Update size form with the new pizza ID
                setSizeForm((prev) => ({ ...prev, pizzaId }))

                // Update image form with the new pizza ID
                setImageForm((prev) => ({ ...prev, pizzaId, alt: `${response.data.data.name} image` }))

                setSuccess("Pizza created successfully!")
                setCurrentStep(1) // Move to next step
                return true
            } else {
                throw new Error("Failed to create pizza")
            }
        } catch (error) {
            console.error("Error creating pizza:", error)
            setError("Failed to create pizza. Please try again.")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Step 2: Create pizza size
    const createPizzaSize = async () => {
        setIsLoading(true)
        setError(null)
        const token = localStorage.getItem("token")
        try {
            const response = await axios.post<PizzaSizeResponse>("/api/pizza-size", sizeForm, {
                headers: {
                    Authorization: token,
                },
            })

            if (response.data.statusCode === 200) {
                setSuccess("Pizza size added successfully!")
                setCurrentStep(2) // Move to next step
                return true
            } else {
                throw new Error("Failed to add pizza size")
            }
        } catch (error) {
            console.error("Error adding pizza size:", error)
            setError("Failed to add pizza size. Please try again.")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Step 3: Upload pizza image
    const uploadPizzaImage = async () => {
        setIsLoading(true)
        setError(null)
        const token = localStorage.getItem("token")
        try {
            const response = await axios.post<PizzaImageResponse>("/api/pizza-image", imageForm, {
                headers: {
                    Authorization: token,
                },
            })

            if (response.data.statusCode === 200) {
                setSuccess("Pizza image uploaded successfully! The pizza has been fully created.")
                toast({
                    title: "Success!",
                    description: "Pizza has been created with size and image.",
                })

                // Reset forms for next pizza-upload
                setPizzaForm({
                    name: "",
                    categoryID: "",
                    description: "",
                })

                setSizeForm({
                    size: "M",
                    price: "",
                    pizzaId: "",
                })

                setImageForm({
                    pizzaId: "",
                    src: "https://i.imgur.com/EzDAxME.png",
                    alt: "",
                })

                setCurrentStep(0) // Reset to first step
                return true
            } else {
                throw new Error("Failed to pizza-upload pizza image")
            }
        } catch (error) {
            console.error("Error uploading pizza image:", error)
            setError("Failed to pizza-upload pizza image. Please try again.")
            return false
        } finally {
            setIsLoading(false)
        }
    }

    // Handle form submission based on current step
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        switch (currentStep) {
            case 0:
                await createPizza()
                break
            case 1:
                await createPizzaSize()
                break
            case 2:
                await uploadPizzaImage()
                break
        }
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Pizza className="h-5 w-5" />
                    Upload New Pizza
                </CardTitle>
                <CardDescription>
                    Create a new pizza in three simple steps: add details, set sizes, and upload an image.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Stepper currentStep={currentStep} className="mb-8">
                    <Step>
                        <StepTitle>Create Pizza</StepTitle>
                        <StepDescription>Add basic pizza information</StepDescription>
                    </Step>
                    <Step>
                        <StepTitle>Add Size</StepTitle>
                        <StepDescription>Set size and price</StepDescription>
                    </Step>
                    <Step>
                        <StepTitle>Upload Image</StepTitle>
                        <StepDescription>Add a pizza image</StepDescription>
                    </Step>
                </Stepper>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="mb-6">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{success}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {currentStep === 0 && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Pizza Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Marjoram-crusted Pigeon"
                                    value={pizzaForm.name}
                                    onChange={handlePizzaInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={pizzaForm.categoryID} onValueChange={handleCategoryChange} required>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your pizza..."
                                    value={pizzaForm.description}
                                    onChange={handlePizzaInputChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="size">Size</Label>
                                <Select value={sizeForm.size} onValueChange={handleSizeChange} required>
                                    <SelectTrigger id="size">
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="S">Small (S)</SelectItem>
                                        <SelectItem value="M">Medium (M)</SelectItem>
                                        <SelectItem value="L">Large (L)</SelectItem>
                                        <SelectItem value="XL">Extra Large (XL)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="text"
                                    placeholder="12"
                                    value={sizeForm.price}
                                    onChange={handleSizeInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="pizzaId">Pizza ID (Auto-filled)</Label>
                                <Input id="pizzaId" name="pizzaId" value={sizeForm.pizzaId} readOnly disabled />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="src">Image URL</Label>
                                <Input
                                    id="src"
                                    name="src"
                                    type="url"
                                    placeholder="https://i.imgur.com/EzDAxME.png"
                                    value={imageForm.src}
                                    onChange={handleImageInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="alt">Image Alt Text</Label>
                                <Input
                                    id="alt"
                                    name="alt"
                                    placeholder="Pizza image alt"
                                    value={imageForm.alt}
                                    onChange={handleImageInputChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="imagePizzaId">Pizza ID (Auto-filled)</Label>
                                <Input id="imagePizzaId" name="pizzaId" value={imageForm.pizzaId} readOnly disabled />
                            </div>

                            {imageForm.src && (
                                <div className="mt-4">
                                    <Label>Image Preview</Label>
                                    <div className="mt-2 border rounded-md overflow-hidden w-full h-48 relative">
                                        <img
                                            src={imageForm.src || "/placeholder.svg"}
                                            alt={imageForm.alt || "Pizza preview"}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.svg"
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </CardContent>

            <CardFooter className="flex justify-between">
                {currentStep > 0 && (
                    <Button
                        variant="outline"
                        onClick={() => {
                            setCurrentStep((prev) => prev - 1)
                            setError(null)
                            setSuccess(null)
                        }}
                        disabled={isLoading}
                    >
                        Previous
                    </Button>
                )}

                <Button type="submit" onClick={handleSubmit} disabled={isLoading} className="ml-auto">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : currentStep === 2 ? (
                        <>
                            <Upload className="mr-2 h-4 w-4" />
                            Complete Upload
                        </>
                    ) : (
                        <>Next Step</>
                    )}
                </Button>
            </CardFooter>
        </Card>
    )
}
