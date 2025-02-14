import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/utils/axios.config";

export default async function handler(req : NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }

    const response = await axiosAPIInstance.post("auth/login", {
        username,
        password
    });

    if (response.status === 200) {
        res.status(200).json(response.data);
    }

    res.status(response.status).json(response.data);
}