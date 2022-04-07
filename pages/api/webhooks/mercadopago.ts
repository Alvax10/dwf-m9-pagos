import { Order } from "lib/models/order";
import { getMerchantOrder } from "lib/mercadopago";
import { NextApiRequest, NextApiResponse} from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { topic, id } = req.query;

    if (topic == 'merchant_order') { 

        const order = await getMerchantOrder(id);
        console.log("Esta es la order en el webhook: ", order);
        if (order.order_status == 'paid') {
            const orderId = order.external_reference;
            const myOrder = new Order(orderId);
            await myOrder.pullData();
            myOrder.data.status = 'closed';
            await myOrder.pushData();

        }
        res.send({ message: "Todo salió bien!" });
    }
}