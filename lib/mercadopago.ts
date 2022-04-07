import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_TOKEN,
});

export async function getMerchantOrder(id) {
    console.log("getMerchantId: ", id);
    const res = await mercadopago.merchant_orders.get(id);
    console.log("Este es el res de mercadoPago: ", res);
    return res.body;
}

export async function createPreference(data) {
    console.log("Create preference: ", data);
    const res = await mercadopago.preferences.create(data); 
    return res.body;
}