import * as React from "react";
import Image from "next/image";
import { PizzaCardProps } from "@/utils/types";

const PizzaCard = ({ name, price, image }: PizzaCardProps) => {
    return (
        <div className="relative flex flex-col items-center bg-gradient-to-b from-yellow-50 to-orange-100 p-6 rounded-full shadow-2xl w-72 h-72 md:w-80 md:h-80 border-4 border-yellow-400 transform transition-all hover:scale-110 hover:shadow-2xl hover:rotate-2">
            {/* Decorative Pizza Crust Border */}
            <div className="absolute inset-0 rounded-full border-8 border-yellow-500 opacity-50"></div>

            {/* Pizza Image */}
            <div className="relative w-44 h-44 md:w-52 md:h-52 z-10">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-yellow-500 shadow-xl"
                />
            </div>

            {/* Pizza Name */}
            <h3 className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-900 text-center drop-shadow-lg z-10">
                {name}
            </h3>

            {/* Pizza Price */}
            <span className="mt-2 text-lg md:text-xl font-bold text-red-700 bg-yellow-200 px-6 py-3 rounded-full shadow-xl border-2 border-red-500 z-10">
                ${price}
            </span>
        </div>
    );
};

export default PizzaCard;
