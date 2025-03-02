import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";
import {serialize} from 'cookie';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    try {
        const {username, password, keepLogin} = req.body;
        const data = {username, password, keepLogin};

        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required"});
        }
        const response = await axiosAPIInstance.post("auth/login", data);

        if (response.status === 200) {
            const shouldKeepLogin = keepLogin === 'true';
            const token = response.data.data;
            res.setHeader('Set-Cookie', serialize('jwt', token, {
                httpOnly: true,
                maxAge: shouldKeepLogin ? 30 * 24 * 60 * 60 : undefined,
                path: '/',
            }));
            res.status(response.status).json(response.data);
        }
    } catch
        (error) {
        res.status(401).json(error);
    }

}