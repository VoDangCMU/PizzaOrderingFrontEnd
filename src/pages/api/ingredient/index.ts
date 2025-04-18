import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";
import {parse} from "cookie";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const {name} = req.body;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axiosAPIInstance.get(`/ingredient`, {
            data: {name},
            headers: {
                Authorization: `${token}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Error create ingredient data", error});
    }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    const {id, name} = req.body;
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwt;
    if (!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        const response = await axiosAPIInstance.put(`/ingredient`, {
            data: {id, name},
            headers: {
                Authorization: `${token}`,
            },
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({message: "Error update ingredient data", error});
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return handlePost(req, res);
        case "PUT":
            return handlePut(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}