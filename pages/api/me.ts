import { User } from "lib/models/user";
import { NextApiRequest, NextApiResponse} from "next";
import { authMiddleware } from "lib/middleWares";

async function handler(req: NextApiRequest, res: NextApiResponse, token) {
    const user = new User(token.userId);
    await user.pullData();
    res.send(user.data);
}

export default authMiddleware(handler);
