type Emotion = {
    name: string
    emoji: string
    keywords: string[]
}

const emotions: Emotion[] = [
    {
        name: "Happy",
        emoji: "😊",
        keywords: ["happy", "joy", "delight", "pleasure", "satisfaction", "enjoyment", "wonderful", "excellent"],
    },
    {
        name: "Excited",
        emoji: "🤩",
        keywords: ["excit", "thrill", "amazing", "fantastic", "awesome", "incredible", "extraordinary"],
    },
    {
        name: "Peaceful",
        emoji: "😌",
        keywords: ["peace", "calm", "tranquil", "serene", "harmony", "balance", "meditat", "mindful", "relax"],
    },
    {
        name: "Thoughtful",
        emoji: "🤔",
        keywords: ["thought", "consider", "reflect", "ponder", "contemplate", "philosophy", "wisdom"],
    },
    {
        name: "Passionate",
        emoji: "🔥",
        keywords: ["passion", "intense", "fire", "heat", "spicy", "dragon", "power", "energy", "strength"],
    },
    {
        name: "Informative",
        emoji: "📚",
        keywords: ["inform", "learn", "knowledge", "education", "guide", "instruct", "teach", "explain"],
    },
]

export function detectEmotion(text: string): Emotion {
    // Convert text to lowercase and remove HTML tags
    const cleanText = text.toLowerCase().replace(/<[^>]+>/g, "")

    // Count occurrences of keywords for each emotion
    const scores = emotions.map((emotion) => {
        const score = emotion.keywords.reduce((total, keyword) => {
            const regex = new RegExp(keyword, "g")
            const matches = cleanText.match(regex)
            return total + (matches ? matches.length : 0)
        }, 0)

        return { emotion, score }
    })

    // Sort by score in descending order
    scores.sort((a, b) => b.score - a.score)

    // Return the emotion with the highest score, or default to Informative
    return scores[0].score > 0 ? scores[0].emotion : emotions[5] // Informative is the default
}
