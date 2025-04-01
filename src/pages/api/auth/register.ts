import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    try {
        const data = {
            username: req.body.username,
            password: req.body.password,
            dateOfBirth: req.body.dateOfBirth.toString(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone.toString(),
            email: req.body.email,
            address: req.body.address,
            role : "member"
        }
        if (!data.username || !data.password || !data.dateOfBirth || !data.firstName || !data.lastName || !data.phone || !data.email || !data.address) {
            return res.status(400).json({message: "Please enter required fields!"});
        }

        const response = await axiosAPIInstance.post("auth/register", data);

        if (response.status === 200) {
            res.status(response.status).json(response.data);

        }

    } catch (error) {
        res.status(401).json(error);
    }
}