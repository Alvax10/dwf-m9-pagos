import { NextApiRequest, NextApiResponse} from "next";
import { sendConfirmedEmail, sendProductBoughtEmail } from "lib/sendgrid";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "lib/models/order";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    const { email, productData } = req.body;

    if (topic == "merchant_order") { 

        const order = await getMerchantOrder(id);
        if (order.order_status == "paid") {
            const orderId = order.external_reference;
            const myOrder = new Order(orderId);
            await myOrder.pullData();
            myOrder.data.status = "closed";
            await myOrder.pushData();

            // MANDO UN MAIL
            await sendConfirmedEmail(email);
            await sendProductBoughtEmail(email, productData);
        }
        res.send(order);
    }
}