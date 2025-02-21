
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image";
import PizzaCardComponent from "@/components/custom/contents/pizza-card";
import {PizzaCardProps} from "@/utils/types";
import * as React from "react";

export default function PizzaModalComponent(pizzaModalProps: PizzaCardProps) {
    const [quantity, setQuantity] = useState(1);
    const { name, price, image } = pizzaModalProps;

    return (
        <Dialog>
            <DialogTrigger >
                <PizzaCardComponent image={image} name={name} price={price} ></PizzaCardComponent>
            </DialogTrigger>

            <DialogContent className="max-w-2xl p-0 bg-white text-black border shadow-sm">
                <div className="grid grid-cols-2">
                    <Image className="flex-1"
                           src={image}
                           alt="pizza"
                           width={350}
                           height={350}
                    />
                    <div className="p-6">
                        <h1 className="text-xl font-bold">
                            {name}
                        </h1>
                        <div className="mt-4">
                            <h3 className="text-md font-semibold mt-4">Crust</h3>
                            <div className="space-y-2 mt-2">
                                <RadioGroup defaultValue="option-one">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one">Fresh Hand-tossed Crust</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two">Fresh New York Crust</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-three" id="option-three"/>
                                        <Label htmlFor="option-two">Super Thin Crust</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <h3 className="text-md font-semibold mt-4">Size</h3>
                            <div className="space-y-2 mt-2">
                                <RadioGroup defaultValue="option-two">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one">Size 9 inch</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two">Cỡ 12 inch</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Chọn số lượng */}
                        <div className="mt-4 flex items-center space-x-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="border rounded-full p-2"
                            >
                                <Minus className="w-4 h-4"/>
                            </button>
                            <span className="text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="border rounded-full p-2"
                            >
                                <Plus className="w-4 h-4"/>
                            </button>
                        </div>

                        <Button className="mt-6 w-full bg-red-600 text-white">
                            Thêm Vào Giỏ Hàng {quantity * price} $
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
