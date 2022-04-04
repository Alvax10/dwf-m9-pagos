import jwt from "jsonwebtoken";

export function generate(objeto) {
    return jwt.sign(objeto, process.env.JWT_SECRET);
}

export function decode(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {
        console.error("Token incorrecto");
        return null;
    }
}