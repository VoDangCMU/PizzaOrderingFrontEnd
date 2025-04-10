import { NextApiRequest, NextApiResponse } from "next";
import { axiosAPIInstance } from "@/lib/axios.config";
import axios from "axios";

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "GET") {
        res.status(405).send("Method Not Allowed");
    }
    const token = req.headers.authorization;
    try {
        const response = await axios.get(`http://15.235.167.33:9241/user/get-all`,{
            headers:{
                Authorization: token
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pizza ingredients data", error: error });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return handlerGet(req, res);
}
