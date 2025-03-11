import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SVGProps } from "react";
import Image from "next/image";

interface CardItemProps {
    image: string;
    title: string;
    price: number;
    description?: string;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

export default function PizzaCardComponent({
                                               image,
                                               title,
                                               price,
                                               description,
                                               quantity,
                                               onIncrease,
                                               onDecrease,
                                               onRemove,
                                           }: CardItemProps) {
    return (
        <Card className="w-full border-2 border-yellow-400">
            <div className="grid gap-2.5 p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                        className="aspect-square object-cover rounded-lg overflow-hidden"
                    />
                    <div className="grid gap-1.5">
                        <h3 className="font-bold text-base leading-none">{title}</h3>
                        <div className="font-bold">${price}</div>
                        {description && <div className="text-sm text-muted">{description}</div>}
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <Button size="sm" variant="outline" className="rounded-full" onClick={onDecrease}>
                            <MinusIcon className="w-3 h-3" />
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="font-bold">{quantity}</span>
                        <Button size="sm" variant="outline" className="rounded-full" onClick={onIncrease}>
                            <PlusIcon className="w-3 h-3" />
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                    <Button size="sm" variant="outline" className="rounded-full" onClick={onRemove}>
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
}

function MinusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
        </svg>
    );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}
