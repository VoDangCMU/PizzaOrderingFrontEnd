import { NextApiRequest, NextApiResponse } from "next";
import { axiosAPIInstance } from "@/lib/axios.config";
import {PizzaResponse} from "@/utils/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const response = await axiosAPIInstance.get(`/pizza`);

        const modifiedPizzas = response.data.data.map((pizza: PizzaResponse) => ({
            id: pizza.id,
            name: pizza.name,
            description: pizza.description,
            price: pizza.unitPrice,
        }));

        res.status(200).json(modifiedPizzas);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pizzas data", error: error });
    }
}
