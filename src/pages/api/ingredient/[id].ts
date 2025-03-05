import { NextApiRequest, NextApiResponse } from "next";
import { axiosAPIInstance } from "@/lib/axios.config";
import { parse } from "cookie";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    try {
        const response = await axiosAPIInstance.get(`/ingredient/${id}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ingredient data", error });
    }
};


const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axiosAPIInstance.delete(`/ingredient/${id}`,
            {
                headers: {
                    Authorization: `${token}`,
                },
            });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Failed delete ingredient", error });
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        case "DELETE":
            return handleDelete(req, res);
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }
}
