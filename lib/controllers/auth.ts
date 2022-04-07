import { addMinutes } from "date-fns";
import { User } from "lib/models/user";
import { Auth } from "lib/models/auth";
import { sendCodeToEmail } from "lib/sendgrid";

export async function findOrCreateAuth(email: string): Promise<Auth> {
    const cleanEmail = email.trim().toLocaleLowerCase();
    const auth = await Auth.findByEmail(cleanEmail);

    if (auth) {
        console.log("Auth existente");
        return auth;

    } else {
        console.log("Usuario nuevo");
        const newUser = await User.createUser({
            email: cleanEmail,
        });

        const newAuth = await Auth.createAuth({
            email: cleanEmail,
            userId: newUser.id,
            code: 0,
            expires: new Date(),
        });

        return newAuth;
    }
}

function randomBetween(min, max) {
    return Math.ceil(Math.random() * (max - min) + min).toString();
}

export async function sendCode(email: string) {

    try {
        const auth = await findOrCreateAuth(email);
        const code = parseInt(randomBetween(10000, 99999));
        const now = new Date();
        const fifteenMinutes = addMinutes(now, 15);
        await sendCodeToEmail(auth.data.email, code);
        auth.data.code = code;
        auth.data.expires = fifteenMinutes;
        await auth.pushData();

        return code;

    } catch (err) {
        console.error("Este es el error en sendCode: ", err);
    }
}
