import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function OrderCardComponent() {
    return (
        <Card className="w-[350px] p-0">
            <CardContent className="flex flex-wrap flex-col items-start justify-start">
                    <img className="flex-1"
                         src="https://bizweb.dktcdn.net/thumb/grande/100/134/673/products/2647819pizza-free-download-wallpaper-jpeg.jpg?v=1475805491287"
                         alt="pizza"
                    />
                    <div>
                        name
                    </div>
                    <div>
                        Gia Tien
                    </div>
            </CardContent>
            <CardFooter className="flex justify-between">

            </CardFooter>
        </Card>
    )
}
