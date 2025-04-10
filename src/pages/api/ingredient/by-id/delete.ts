import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handleDeleteByID = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { id } = req.body;
    const token = req.headers.authorization;

    if (!id) {
        return res.status(400).json({ message: "Missing ID" });
    }

    try {
        const response = await axios.delete(`http://15.235.167.33:9241/ingredient/delete/${id}`, {
            headers: {
                Authorization: token,
            }
        });

        res.status(200).json(response.data);
    } catch (e) {
        console.error("Server error:", e);
        res.status(500).json({ message: "Error deleting ingredient", error: e });
    }
};

export default handleDeleteByID;
