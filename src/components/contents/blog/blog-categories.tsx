
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface BlogCategoriesProps {
    categories: string[]
    selectedCategory: string
    onCategoryChange: (category: string) => void
}

export function BlogCategories({ categories, selectedCategory, onCategoryChange }: BlogCategoriesProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
                {categories.map((category, index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <Button
                            variant={selectedCategory === category ? "default" : "ghost"}
                            className={`w-full justify-start ${
                                selectedCategory === category
                                    ? "bg-kungfu-red hover:bg-kungfu-darkRed text-white"
                                    : "hover:bg-kungfu-red/10"
                            }`}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

