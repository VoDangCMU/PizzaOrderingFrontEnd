import * as React from "react"

import {
    Card,
    CardContent,
} from "@/components/ui/card"
import {PizzaCardProps} from "@/utils/types";
import Image from "next/image";


export default function PizzaCardComponent(PizzaCardProps: PizzaCardProps) {
    const { name, price, image } = PizzaCardProps;
    return (
        <Card className="w-[350px] p-0">
            <CardContent className="flex flex-wrap flex-col items-start justify-start">
                    <Image className="flex-1"
                        src={image}
                         alt="pizza"
                            width={350}
                            height={350}
                    />
                    <div>
                        {name}
                    </div>
                    <div>
                        {price}
                    </div>
            </CardContent>
        </Card>
    )
}
