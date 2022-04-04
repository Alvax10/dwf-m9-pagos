import parseToken from "parse-bearer-token";
import { decode } from "lib/controllers/jwt";
import { NextApiRequest, NextApiResponse} from "next";

export function authMiddleware(callback) {
    return function(req: NextApiRequest, res: NextApiResponse) {
        const token = parseToken(req);
        
        if (!token) {
            res.status(401).send({ message: "No hay token "});
        }
        const decodedToken = decode(token);
        console.log(decodedToken);

        if (decodedToken) {
            callback(req, res, decodedToken);

        } else {
            res.status(401).send({ message: "Token incorrecto "});
        }
    }
}