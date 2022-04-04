import { NextApiRequest, NextApiResponse} from "next";
import { findOrCreateAuth } from "lib/controllers/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const auth = await findOrCreateAuth(req.body.email);
    res.send(auth.data);
}