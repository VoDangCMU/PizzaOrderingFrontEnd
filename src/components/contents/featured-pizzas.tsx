"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const pizzas = [
    {
        id: 166,
        name: "The Hawaiian Pizza",
        description:
            "Spicy pepperoni, jalapeños, and dragon fruit on our signature crust, finished with a fiery sauce that brings the heat of a dragon's breath.",
        price: "$18.99",
        image: "https://pizzas.khoav4.com/The Hawaiian Pizza.png?height=200&width=200",
        category: "Classic",
    },
    {
        id: 192,
        name: "The Pepper Salami Pizza",
        description:
            "Hearty vinegar and emu stew, slow-cooked with chives and kohlrabi for a comforting, flavorful meal..",
        price: "$16.99",
        image: "https://pizzas.khoav4.com/The Pepper Salami Pizza.png?height=200&width=200",
        category: "Supreme",
    },
    {
        id: 177,
        name: "The Italian Capocollo Pizza",
        description:
            "A classic pie filled with delicious beef and spicy scallops, baked in a salty pastry crust and topped with a golden-brown lattice.",
        price: "$21.99",
        image: "https://pizzas.khoav4.com/The Italian Capocollo Pizza.png?height=200&width=200",
        category: "Classic",
    },
    {
        id: 174,
        name: "The Greek Pizza",
        description:
            "Baked parrotfish-stuffed venison, seasoned with caraway seed and rich herbs, accompanied by roasted radish medley.",
        price: "$21.99",
        image: "https://pizzas.khoav4.com/The Greek Pizza.png?height=200&width=200",
        category: "Classic",
    },
    {
        id: 181,
        name: "The Southwest Chicken Pizza",
        description:
            "Three carob carrot with cornichons, bean shoots, parsnip, cabbage and tamari. With a side of baked nectarine, and your choice of white bread or candle nut.",
        price: "$21.99",
        image: "https://pizzas.khoav4.com/The Southwest Chicken Pizza.png?height=200&width=200",
        category: "Chicken",
    },
    {
        id: 184,
        name: "The Chicken Pesto Pizza",
        description:
            "A simple cherry pie. No fancy stuff. Just pie.",
        price: "$21.99",
        image: "https://pizzas.khoav4.com/The Chicken Pesto Pizza.png?height=200&width=200",
        category: "Chicken",
    },
]

export default function FeaturedPizzas() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <section ref={ref} className="py-20 bg-gradient-to-b from-background to-kungfu-gold/10">
            <div className="container px-4">
                <div className="text-center mb-12">
                    {/*<motion.div*/}
                    {/*    className="mb-6 flex justify-center"*/}
                    {/*    initial={{ opacity: 0, scale: 0.8 }}*/}
                    {/*    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}*/}
                    {/*    transition={{ duration: 0.6 }}*/}
                    {/*>*/}
                    {/*    <Image src="/kungfu-divider.png" alt="Kungfu Divider" width={120} height={30} className="object-contain" />*/}
                    {/*</motion.div>*/}

                    <motion.h2
                        className="text-3xl md:text-5xl font-bold mb-4 kungfu-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        Legendary Creations
                    </motion.h2>
                    <motion.p
                        className="text-lg max-w-2xl mx-auto text-foreground/80"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our master chefs have perfected these recipes through years of dedicated practice and meditation.
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {pizzas.map((pizza) => (
                        <motion.div
                            key={pizza.id}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link href={`/menu/${pizza.id}`}>
                                <Card className="h-full flex flex-col overflow-hidden kungfu-card shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-square overflow-hidden relative group">
                                        <Image
                                            src={pizza.image || "https://i.imgur.com/ts6tQmj.jpeg"}
                                            alt={pizza.name}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <span className="text-white text-sm font-medium px-2 py-1 rounded-full bg-kungfu-red/80 backdrop-blur-sm">
                        {pizza.category}
                      </span>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold">{pizza.name}</CardTitle>
                                        <CardDescription className="line-clamp-2">{pizza.description}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className="mt-auto flex justify-between items-center">
                                        <span className="text-lg font-bold text-kungfu-red">{pizza.price}</span>
                                        <Button size="sm" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            Order Now
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10 btn-hover"
                    >
                        <Link href="/menu">View Full Menu</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

// "use client"
//
// import { useRef, useState, useEffect } from "react"
// import { motion, useInView } from "framer-motion"
// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ShoppingCart } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
//
// // Định nghĩa interface cho dữ liệu pizza
// interface PizzaSize {
//     id: string
//     size: string
//     price: string
//     image: string
//     pizzaNameID: string
// }
//
// interface PizzaCategory {
//     id: string
//     name: string
// }
//
// interface PizzaImage {
//     id: string
//     src: string
//     alt: string
// }
//
// interface Pizza {
//     id: string
//     name: string
//     description: string
//     sizes: PizzaSize[]
//     category: PizzaCategory
//     images: PizzaImage[]
// }
//
// export default function FeaturedPizzas() {
//     const [pizzas, setPizzas] = useState<
//         Array<{
//             id: string
//             name: string
//             description: string
//             price: string
//             image: string
//             category: string
//         }>
//     >([])
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
//
//     const ref = useRef(null)
//     const isInView = useInView(ref, { once: true, amount: 0.2 })
//     const ai_api = localStorage.getItem("ai_api")
//     useEffect(() => {
//         const fetchRecommendedPizzas = async () => {
//             try {
//                 setIsLoading(true)
//
//                 // Gọi API đề xuất
//                 const recommendResponse = await fetch(
//                     `${ai_api}/recommend`,
//                     {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify({
//                             pizza_id: "hawaiian_m",
//                             order_time: "21:20:36",
//                             time_window: 360,
//                             limit: 6,
//                             month: 2,
//                             day: 15,
//                             weekday: 2,
//                             shop_name: "ABC",
//                         }),
//                     },
//                 )
//
//                 if (!recommendResponse.ok) {
//                     throw new Error("Failed to fetch recommendations")
//                 }
//
//                 const recommendData = await recommendResponse.json()
//                 const suggestedPizzaIds = recommendData.suggested_pizza_ids || []
//
//                 const pizzaDetailsPromises = suggestedPizzaIds.map(async ([pizzaNameID, similarity]: [string, number]) => {
//                     const detailResponse = await fetch(`/api/pizza/by-name-id/${pizzaNameID}`)
//                     console.log(similarity)
//                     if (!detailResponse.ok) {
//                         console.error(`Failed to fetch details for pizza ${pizzaNameID}`)
//                         return null
//                     }
//
//                     const detailData = await detailResponse.json()
//                     return detailData.data
//                 })
//
//                 // Đợi tất cả các request hoàn thành
//                 const pizzaDetails = await Promise.all(pizzaDetailsPromises)
//
//                 const formattedPizzas = pizzaDetails
//                     .filter((pizza) => pizza !== null)
//                     .map((pizza: Pizza) => ({
//                         id: pizza.id,
//                         name: pizza.name,
//                         description: pizza.description,
//                         price: `$${pizza.sizes[0]?.price || "0.00"}`,
//                         image: pizza.images[0]?.src || `https://pizzas.khoav4.com/${encodeURIComponent(pizza.name)}.png`,
//                         category: pizza.category?.name || "Pizza",
//                     }))
//
//                 setPizzas(formattedPizzas)
//             } catch (err) {
//                 console.error("Error fetching recommended pizzas:", err)
//                 setError("Failed to load recommended pizzas. Using fallback data.")
//
//                 // Sử dụng dữ liệu mẫu khi có lỗi
//                 setPizzas([
//                     {
//                         id: "166",
//                         name: "The Hawaiian Pizza",
//                         description:
//                             "Spicy pepperoni, jalapeños, and dragon fruit on our signature crust, finished with a fiery sauce that brings the heat of a dragon's breath.",
//                         price: "$18.99",
//                         image: "https://pizzas.khoav4.com/The Hawaiian Pizza.png",
//                         category: "Classic",
//                     },
//                     {
//                         id: "192",
//                         name: "The Pepper Salami Pizza",
//                         description:
//                             "Hearty vinegar and emu stew, slow-cooked with chives and kohlrabi for a comforting, flavorful meal.",
//                         price: "$16.99",
//                         image: "https://pizzas.khoav4.com/The Pepper Salami Pizza.png",
//                         category: "Supreme",
//                     },
//                     {
//                         id: "177",
//                         name: "The Italian Capocollo Pizza",
//                         description:
//                             "A classic pie filled with delicious beef and spicy scallops, baked in a salty pastry crust and topped with a golden-brown lattice.",
//                         price: "$21.99",
//                         image: "https://pizzas.khoav4.com/The Italian Capocollo Pizza.png",
//                         category: "Classic",
//                     },
//                     {
//                         id: "174",
//                         name: "The Greek Pizza",
//                         description:
//                             "Baked parrotfish-stuffed venison, seasoned with caraway seed and rich herbs, accompanied by roasted radish medley.",
//                         price: "$21.99",
//                         image: "https://pizzas.khoav4.com/The Greek Pizza.png",
//                         category: "Classic",
//                     },
//                     {
//                         id: "181",
//                         name: "The Southwest Chicken Pizza",
//                         description:
//                             "Three carob carrot with cornichons, bean shoots, parsnip, cabbage and tamari. With a side of baked nectarine, and your choice of white bread or candle nut.",
//                         price: "$21.99",
//                         image: "https://pizzas.khoav4.com/The Southwest Chicken Pizza.png",
//                         category: "Chicken",
//                     },
//                     {
//                         id: "184",
//                         name: "The Chicken Pesto Pizza",
//                         description: "A simple cherry pie. No fancy stuff. Just pie.",
//                         price: "$21.99",
//                         image: "https://pizzas.khoav4.com/The Chicken Pesto Pizza.png",
//                         category: "Chicken",
//                     },
//                 ])
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//
//         fetchRecommendedPizzas()
//     }, [])
//
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//             },
//         },
//     }
//
//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0 },
//     }
//
//     return (
//         <section ref={ref} className="py-20 bg-gradient-to-b from-background to-kungfu-gold/10">
//             <div className="container px-4">
//                 <div className="text-center mb-12">
//                     <motion.h2
//                         className="text-3xl md:text-5xl font-bold mb-4 kungfu-text"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         {error ? "Our Popular Pizzas" : "Recommended For You"}
//                     </motion.h2>
//                     <motion.p
//                         className="text-lg max-w-2xl mx-auto text-foreground/80"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                     >
//                         {error
//                             ? "Our master chefs have perfected these recipes through years of dedicated practice and meditation."
//                             : "Based on your preferences, we think you might enjoy these delicious options."}
//                     </motion.p>
//
//                     {error && (
//                         <motion.div
//                             className="mt-4 text-yellow-600 dark:text-yellow-400"
//                             initial={{ opacity: 0 }}
//                             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                             transition={{ duration: 0.6, delay: 0.4 }}
//                         >
//                             {error}
//                         </motion.div>
//                     )}
//                 </div>
//
//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-64">
//                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-kungfu-red"></div>
//                     </div>
//                 ) : (
//                     <>
//                         <motion.div
//                             className="grid grid-cols-1 md:grid-cols-3 gap-8"
//                             variants={containerVariants}
//                             initial="hidden"
//                             animate={isInView ? "visible" : "hidden"}
//                         >
//                             {pizzas.map((pizza) => (
//                                 <motion.div
//                                     key={pizza.id}
//                                     variants={itemVariants}
//                                     whileHover={{ y: -10 }}
//                                     transition={{ type: "spring", stiffness: 300 }}
//                                 >
//                                     <Link href={`/menu/${pizza.id}`}>
//                                         <Card className="h-full flex flex-col overflow-hidden kungfu-card shadow-lg hover:shadow-xl transition-all duration-300">
//                                             <div className="aspect-square overflow-hidden relative group">
//                                                 <Image
//                                                     src={pizza.image || "https://i.imgur.com/ts6tQmj.jpeg"}
//                                                     alt={pizza.name}
//                                                     width={400}
//                                                     height={400}
//                                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                                 />
//                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
//                           <span className="text-white text-sm font-medium px-2 py-1 rounded-full bg-kungfu-red/80 backdrop-blur-sm">
//                             {pizza.category}
//                           </span>
//                                                 </div>
//                                             </div>
//                                             <CardHeader>
//                                                 <CardTitle className="text-xl font-bold">{pizza.name}</CardTitle>
//                                                 <CardDescription className="line-clamp-2">{pizza.description}</CardDescription>
//                                             </CardHeader>
//                                             <CardFooter className="mt-auto flex justify-between items-center">
//                                                 <span className="text-lg font-bold text-kungfu-red">{pizza.price}</span>
//                                                 <Button size="sm" className="bg-kungfu-red hover:bg-kungfu-darkRed text-white kungfu-button">
//                                                     <ShoppingCart className="h-4 w-4 mr-2" />
//                                                     Order Now
//                                                 </Button>
//                                             </CardFooter>
//                                         </Card>
//                                     </Link>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//
//                         <motion.div
//                             className="text-center mt-12"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                             transition={{ duration: 0.6, delay: 0.8 }}
//                         >
//                             <Button
//                                 asChild
//                                 size="lg"
//                                 variant="outline"
//                                 className="border-kungfu-red text-kungfu-red hover:bg-kungfu-red/10 btn-hover"
//                             >
//                                 <Link href="/menu">View Full Menu</Link>
//                             </Button>
//                         </motion.div>
//                     </>
//                 )}
//             </div>
//         </section>
//     )
// }

