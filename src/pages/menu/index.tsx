import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import axios from "axios";

interface Pizza {
    id: string;
    name: string;
    description: string;
    price: string;
}

const categories = ["All", "Specialty", "Vegetarian", "Meat", "Classic", "Signature"];

export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>(pizzas);

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get("/api/pizza");
                setPizzas(response.data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };
        fetchPizzas();
    }, []);

    useEffect(() => {
        let filtered = pizzas;

        if (searchTerm) {
            filtered = filtered.filter(
                (pizza) =>
                    pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // if (selectedCategory !== "All") {
        //     filtered = filtered.filter((pizza) => pizza.category === selectedCategory);
        // }

        setFilteredPizzas(filtered);
    }, [searchTerm, selectedCategory, pizzas]);

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4">
                <div className="text-center mb-8">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Menu
                    </motion.h1>
                    <motion.p
                        className="text-lg max-w-2xl mx-auto text-foreground/80 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Explore our selection of martial arts inspired pizzas, crafted with precision and passion.
                    </motion.p>

                    <motion.div
                        className="max-w-md mx-auto mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search pizzas..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                    </motion.div>

                    {/* Category Filters */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-2 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {categories.map((category, index) => (
                            <Button
                                key={index}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </motion.div>
                </div>

                {/* Pizza Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPizzas.length > 0 ? (
                        filteredPizzas.map((pizza, index) => (
                            <motion.div
                                key={pizza.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                                whileHover={{ y: -10 }}
                            >
                                <Link href={`/menu/${pizza.id}`}>
                                    <Card className="h-full flex flex-col overflow-hidden border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                                        <div className="aspect-square overflow-hidden relative group">
                                            <Image
                                                src={ "https://i.imgur.com/ts6tQmj.jpeg"}
                                                alt={pizza.name}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <Badge className="bg-primary/80 backdrop-blur-sm">{`Sale Off`}</Badge>
                                            </div>
                                        </div>
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-xl font-bold">{pizza.name}</CardTitle>
                                            <CardDescription className="line-clamp-2 h-10">{pizza.description}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
                                            <span className="text-lg font-bold text-primary">${parseFloat(pizza.price).toFixed(2)}</span>
                                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white btn-hover">
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Order
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-lg text-muted-foreground">No pizzas found. Try a different search term or category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
