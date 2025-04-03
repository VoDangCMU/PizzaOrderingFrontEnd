import { NextApiRequest, NextApiResponse } from "next";
import { axiosAPIInstance } from "@/lib/axios.config";

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axiosAPIInstance.get(`/user/get-all`);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data", error: error });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return handlerGet(req, res);
}
