import * as sgMail from "@sendgrid/mail";

export async function sendCodeToEmail(email: string, code: number) {

    await sgMail.setApiKey(process.env.API_KEY_SENDGRIND);
    const msg = {
        to: email,
        from: "alvaro695547@gmail.com",
        subject: `Este es tu código para loguearte`,
        text: `Este es el código: ${code}`,
        html: `<strong> Este es el código que necesitas para loguearte: ${code} </strong>`,
    }
    const enviarMail = await sgMail.send(msg)
    .then(() => {
        console.log("Email enviado! :D");
        return true;
    });
}

export async function sendConfirmedEmail(email: string) {

    await sgMail.setApiKey(process.env.API_KEY_SENDGRIND);
    const msg = {
        to: email,
        from: "alvaro695547@gmail.com",
        subject: `Tu pago fue aprobado!`,
        text: `El pago de la compra que realizaste fue aprobada!`,
        html: `<title> Pago de compra aprobada </title>`,
    }
    const enviarMail = await sgMail.send(msg)
    .then(() => {
        console.log("Email enviado! :D");
        return true;
    });
}

export async function sendProductBoughtEmail(email: string, productData) {
    await sgMail.setApiKey(process.env.API_KEY_SENDGRIND);
    const msg = {
        to: email,
        from: "alvaro695547@gmail.com",
        subject: `Compraste ${productData.title}!`,
        text: `La compra ${productData.title} de ${productData.unit_price} fue exitosa, esperamos que la disfrutes!`,
        html: `Compra ${productData.title}`,
    }
    const enviarMail = await sgMail.send(msg)
    .then(() => {
        console.log("Email enviado! :D");
        return true;
    });
}