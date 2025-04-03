
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface BlogSearchProps {
    searchTerm: string
    onSearchChange: (value: string) => void
}

export function BlogSearch({ searchTerm, onSearchChange }: BlogSearchProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h3 className="text-lg font-semibold mb-4">Search</h3>
            <div className="relative">
                <Input
                    type="search"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
        </motion.div>
    )
}

