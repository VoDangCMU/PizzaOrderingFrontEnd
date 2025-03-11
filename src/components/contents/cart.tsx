import { useState } from "react";
import PizzaCardComponent from "@/components/contents/cart-item";
import { Button } from "@/components/ui/button";

interface CartItem {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number;
}

export default function CartComponent() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            image: "https://bnhat.vn/wp-content/uploads/2023/08/6776_Pizza-Dough_ddmfs_2x1_1725-fdaa76496da045b3bdaadcec6d4c5398.jpg",
            title: "Pepperoni Pizza",
            price: 12.99,
            quantity: 1,
        },
        {
            id: 2,
            image: "https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900",
            title: "Veggie Pizza",
            price: 10.99,
            quantity: 2,
        },
    ]);

    const handleIncrease = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrease = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <div className="flex flex-col p-4">
            <h2 className="text-2xl font-bold mb-4">🛒 Giỏ hàng</h2>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start ">
                {cartItems.map((item) => (
                    <PizzaCardComponent
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        quantity={item.quantity}
                        onIncrease={() => handleIncrease(item.id)}
                        onDecrease={() => handleDecrease(item.id)}
                        onRemove={() => handleRemove(item.id)}
                    />
                ))}
            </div>

            {cartItems.length > 0 ? (
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4">
                    <div className="text-lg font-bold mb-2 md:mb-0">Tổng tiền: ${totalAmount.toFixed(2)}</div>
                    <Button className="px-6 py-2 text-lg font-semibold">
                        Thanh toán
                    </Button>
                </div>
            ) : (
                <p className="text-center mt-4 text-gray-500">Giỏ hàng trống.</p>
            )}
        </div>
    );
}
