import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handlerGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }
    const { page, pageSize } = req.query;
    try {
        const response = await axiosAPIInstance.get(`/user/get-all?page=${page}&pageSize=${pageSize}`, {
            headers: {
                Authorization: token,
            }
        });

        // Kiểm tra nếu phản hồi trả về không phải mã 2xx
        if (response.status !== 200) {
            return res.status(response.status).json({
                message: `API returned error with status: ${response.status}`,
                data: response.data
            });
        }

        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error fetching user data", error);
    }
};



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({message: "Method not allowed"});
    }

    return handlerGet(req, res);
}