import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
    id: number
    title: string
    excerpt: string
    date: string
    author: string
    image: string
    rating: number
    category: string
    tags: string[]
}

interface BlogCardProps {
    post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
    return (
        <Card className="h-full flex flex-col overflow-hidden kungfu-card">
            <div className="aspect-video relative overflow-hidden">
                <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-kungfu-red text-white text-xs px-2 py-1 rounded flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {post.rating.toFixed(1)}
                </div>
            </div>
            <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                    {post.date} • by {post.author}
                </div>
                <CardTitle className="text-xl hover:text-kungfu-red transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto pt-0">
                <Button asChild variant="kungfu" className="w-full">
                    <Link href={`/blog/${post.id}`}>Read Full Review</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

