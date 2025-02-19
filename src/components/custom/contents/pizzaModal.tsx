
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {OrderCardComponent} from "@/components/custom/contents/orderCard";

export default function PizzaModal() {
    const [quantity, setQuantity] = useState(1);

    return (

        <Dialog>
            <DialogTrigger >
                <OrderCardComponent></OrderCardComponent>
            </DialogTrigger>

            <DialogContent className="max-w-2xl p-0 bg-white text-black border shadow-sm">
                <div className="grid grid-cols-2">
                    <img
                        src="/pizza-image.jpg"
                        alt="Pizza"
                        className="w-full h-full object-cover"
                    />
                    <div className="p-6">
                        <h1 className="text-xl font-bold">
                            Pizza Siêu Topping Bò Gơ Bò Mỹ Xốt Phô Mai Ngập Vị
                        </h1>
                        <h3 className="text-sm text-gray-600 mt-2">
                            Tăng 50% lượng topping protein: Thịt bò, phô mai...
                        </h3>
                        <div className="mt-4">
                            <h3 className="text-md font-semibold mt-4">Chọn Đế Bánh</h3>
                            <div className="space-y-2 mt-2">
                                <RadioGroup defaultValue="option-one">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one">Đế Dày Bột Tươi</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two">Đế Vừa Bột Tươi</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-three" id="option-three"/>
                                        <Label htmlFor="option-two">Đế Mỏng Giòn</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <h3 className="text-md font-semibold mt-4">Chọn Cỡ Bánh</h3>
                            <div className="space-y-2 mt-2">
                                <RadioGroup defaultValue="option-two">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one">Cỡ 9 inch</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two">Cỡ 12 inch</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <h3 className="text-md font-semibold mt-4">Chọn Đế Bánh</h3>
                            <div className="space-y-2 mt-2">
                                <RadioGroup defaultValue="option-three">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-one" id="option-one"/>
                                        <Label htmlFor="option-one">De day bot tuoi</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="option-two" id="option-two"/>
                                        <Label htmlFor="option-two">Option Two</Label>
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
                            Thêm Vào Giỏ Hàng {quantity * 235000}đ
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
