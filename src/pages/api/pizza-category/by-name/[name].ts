import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const name = req.query.name || "";
    try {
        const response = await axiosAPIInstance.get(`/pizza-category/get-by-name/${name}`);

        if (response.status != 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch {
        res.status(500).json({message: ("Failed to get pizza category with name " + name)});
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}