import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get(`${process.env.DATA_API}/health-check-with-token`, {
            headers: {
                Authorization: `${req.headers.authorization}`,
            },
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
