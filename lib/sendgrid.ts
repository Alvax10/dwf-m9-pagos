import * as sgMail from "@sendgrid/mail";

export async function sendCodeToEmail(email: string, code: string) {

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

export async function sendProductBoughtEmail(email: string, orderData) {
    await sgMail.setApiKey(process.env.API_KEY_SENDGRIND);
    const msg = {
        to: email,
        from: "alvaro695547@gmail.com",
        subject: `Compraste ${orderData.title}!`,
        text: `La compra ${orderData.title} de ${orderData.unit_price} fue exitosa, esperamos que la disfrutes!`,
        html: `Compra ${orderData.title}`,
    }
    const enviarMail = await sgMail.send(msg)
    .then(() => {
        console.log("Email enviado! :D");
        return true;
    });
}