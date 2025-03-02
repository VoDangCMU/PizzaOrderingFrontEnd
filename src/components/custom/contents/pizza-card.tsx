import * as React from "react";
import {PizzaCardProps} from "@/utils/types";

const PizzaCard = ({name, price, image}: PizzaCardProps) => {
    const backgroundStyle = image ? {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    } : {};

    return (
        <div
            className="relative flex flex-col items-center p-6 rounded-full shadow-2xl w-64 h-64 md:w-72 md:h-72 border-4 border-yellow-400 transform transition-all hover:scale-110 hover:shadow-2xl hover:rotate-2"
            style={{backgroundImage: `url(${backgroundStyle})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 rounded-full"></div>
            <div className="relative w-44 h-44 md:w-52 md:h-52 z-10">
                {/* <Imagef
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-yellow-500 shadow-xl"
                /> */}
            </div>
            <div className="absolute inset-0 rounded-full border-8 border-yellow-500 opacity-50"></div>

            <h3 className="relative z-10 mt-4 text-2xl md:text-3xl font-extrabold text-center text-white drop-shadow-[3px_5px_8px_rgba(0,0,0,0.9)]">
                {name}
            </h3>


            <span
                className="relative z-10 mt-2 text-lg md:text-xl font-bold text-red-700 bg-yellow-200 px-6 py-3 rounded-full shadow-xl border-2 border-red-500">
        ${price}
    </span>
        </div>
    );
};

export default PizzaCard;
