import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.post('https://df48-2001-ee0-4b52-6fe0-7c79-cd72-1e8d-589b.ngrok-free.app/fact-combined')

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching pizza ingredients data", error: error });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    return handlePost(req, res);
}
