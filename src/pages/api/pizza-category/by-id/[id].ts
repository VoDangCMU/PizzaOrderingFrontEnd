import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id || "";
    try {
        const response = await axiosAPIInstance.get(`/pizza-category/get-by-id/${id}`);

        if (response.status != 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch {
        res.status(500).json({message: ("Failed to get pizza category with id " + id)});
    }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const token = req.headers.authorization;
    try {
        const response = await axiosAPIInstance.put(`/pizza-category/delete/${id}`, {
            headers: {
                Authorization: token
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
    const {name, description} = req.body;
    const token = req.headers.authorization;
    try {
        const response = await axiosAPIInstance.put(`/pizza-category/update`, {
            id,
            name,
            description
        }, {
            headers : {
                Authorization: token
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
