import * as React from "react";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PizzaCard from "@/components/custom/contents/pizza-card";
import { PizzaCardProps } from "@/utils/types";

const PizzaModalComponent = ({ name, price, image }: PizzaCardProps) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <Dialog>
            <DialogTrigger>
                <PizzaCard image={image} name={name} price={price} />
            </DialogTrigger>

            <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl p-4 sm:p-6 bg-white text-black border-4 border-yellow-400 shadow-lg rounded-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6">
                    <div className="relative w-full h-60 sm:h-72 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
                        <Image
                            src={image}
                            alt={name}
                            width={300}
                            height={300}
                            className="rounded-md shadow-md border border-gray-400 object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">{name}</h1>
                        <p className="text-sm text-gray-600 mt-2">Tăng 50% lượng topping protein: Thịt bò, phô mai...</p>

                        <div className="mt-4 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">Chọn Đế Bánh</h3>
                                <RadioGroup defaultValue="thick-crust" className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="thick-crust" id="thick-crust" />
                                        <Label htmlFor="thick-crust">Đế Dày Bột Tươi</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="medium-crust" id="medium-crust" />
                                        <Label htmlFor="medium-crust">Đế Vừa Bột Tươi</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="thin-crust" id="thin-crust" />
                                        <Label htmlFor="thin-crust">Đế Mỏng Giòn</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Chọn Cỡ Bánh</h3>
                                <RadioGroup defaultValue="medium" className="mt-2 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="small" id="small" />
                                        <Label htmlFor="small">Cỡ 9 inch</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="medium" id="medium" />
                                        <Label htmlFor="medium">Cỡ 12 inch</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Chọn số lượng */}
                        <div className="mt-4 flex items-center space-x-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="border rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <Minus className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="text-lg font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="border rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
                            >
                                <Plus className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>

                        <Button className="mt-6 w-full bg-red-600 text-white py-3 font-semibold rounded-lg shadow-md hover:bg-red-700 transition">
                            Thêm Vào Giỏ Hàng - {quantity * price} $
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PizzaModalComponent;