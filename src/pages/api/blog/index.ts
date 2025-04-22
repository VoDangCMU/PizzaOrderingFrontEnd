import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handlerGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }
    const token = req.headers.authorization;
    const { title, body, userId} = req.body;
    try {
        const response = await axiosAPIInstance.post(`/post`, {
            title,
            body,
            userId
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            },
        });

        res.status(200).json(response.data);
    } catch (e) {
        res.status(500).json({message: "Error fetching blogs data", error: e});
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }
    return handlerGetAll(req, res);
}
