"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SearchX } from "lucide-react"

export function EmptyResults() {
    return (
        <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-md mx-auto">
                <motion.div
                    className="bg-muted rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <SearchX className="h-12 w-12 text-muted-foreground" />
                </motion.div>
                <motion.h2
                    className="text-2xl font-bold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    No results found
                </motion.h2>
                <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    We couldn't find any blog posts matching your search criteria.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Button
                        onClick={() => window.location.reload()}
                        className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button"
                    >
                        Reset Filters
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}
