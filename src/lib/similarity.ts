interface BlogPost {
    id: number
    title: string
    category: string
    tags: string[]
    author: string
}

export function calculateSimilarity(post1: BlogPost, post2: BlogPost): number {
    let score = 0

    if (post1.category === post2.category) {
        score += 0.3
    }

    if (post1.author === post2.author) {
        score += 0.2
    }

    const sharedTags = post1.tags.filter((tag) => post2.tags.includes(tag))
    score += sharedTags.length * 0.15

    const words1 = post1.title.toLowerCase().split(" ")
    const words2 = post2.title.toLowerCase().split(" ")
    const sharedWords = words1.filter((word) => word.length > 3 && words2.includes(word))
    score += sharedWords.length * 0.05

    return Math.min(score, 1.0)
}

