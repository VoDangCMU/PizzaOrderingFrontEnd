import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id || "";
    try {
        const response = await axiosAPIInstance.get(`/post/get-by-id/${id}`);

        if (response.status != 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch {
        res.status(500).json({message: ("Failed to get blog with id " + id)});
    }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;

    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({message: "No token provided"});
    }

    try {
        const response = await axiosAPIInstance.put(`/post/delete/${id}`, {
            headers: {
                Authorization: token,
            }
        });

        if (response.status !== 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch (e) {
        res.status(500).json({message: e});
    }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const {title, body} = req.body;
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({message: "No token provided"});
    }

    try {
        const response = await axiosAPIInstance.put(`/post/update`, {
            id,
            title,
            body
        }, {
            headers: {
                Authorization: token,
            }
        })

        if (response.status !== 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch (e) {
        res.status(500).json({message: e});
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
        case "DELETE":
            return handleDelete(req, res);
        case "PUT":
            return handlePut(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}
