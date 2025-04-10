import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handlerGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }
    try {
        const response = await axiosAPIInstance.get(`/ingredient/get-all`);
        res.status(200).json(response.data);
    } catch (e) {
        res.status(500).json({message: "Error fetching ingredient data", error: e});
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== "GET") {
            return res.status(405).json({message: "Method not allowed"});
        }
        return handlerGetAll(req, res);
    }
