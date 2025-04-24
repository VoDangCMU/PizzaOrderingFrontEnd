import {NextApiRequest, NextApiResponse} from "next";
import {axiosAPIInstance} from "@/lib/axios.config";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pizzaId, src, alt } = req.body;
    const token = req.headers.authorization ;
    try {
        const response = await axiosAPIInstance.post(`/pizza-image`, {pizzaId, src, alt} , {
        headers : {
            Authorization: token,
        }
        });
        if (response.status != 200) {
            res.status(response.data.statusCode).json({"message": response.data.message});
        }

        res.status(200).json(response.data);
    } catch (e){
        console.log(e)
        res.status(500).json({message: ("Failed to create pizza")});
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "POST":
            return handlePost(req, res);
        default:
            return res.status(405).json({message: "Method not allowed"});
    }
}
