import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const token = req.headers.authorization;
    try {
        const response = await axiosAPIInstance.get(`/user/get-by-id/${id}`, {
            headers : {
                Authorization: token
            }
        });
        console.log(response);
        res.status(200).json(response.data);

    } catch (e) {
        res.status(500).json({message: "Error fetching pizza data", error});
    }
};


const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query.id;
    const token = req.headers.authorization;

    try {
        const response = await axiosAPIInstance.put(`/user/delete/${id}`, {
            headers : {
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
    const token = req.headers.authorization;
    const {
        username,
        oldPassword,
        newPassword,
        firstName,
        lastName,
        phone,
        email,
        address,
        dateOfBirth,
    } = req.body;
    try {
        const response = await axiosAPIInstance.put(`/user/update`, {
            username, id, firstName, lastName, phone, email, address, dateOfBirth, oldPassword, newPassword
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