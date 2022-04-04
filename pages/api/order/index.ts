import { Order } from "lib/models/order";
import { createPreference } from "lib/mercadopago";
import method from "micro-method-router";
import { authMiddleware } from "lib/middleWares";
import { NextApiRequest, NextApiResponse} from "next";

const products = {
    1234: {
        "title": "Batman hot toys",
        "price": 100000,
    }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
    const { productId } = req.query as any;
    const product = products[productId];

    if (!product) {
        res.status(404).send({ message: "Producto no encontrado" });
    }

    const order = await Order.createNewOrder({
        additionalInfo: req.body,
        productId,
        userId: token.userId,
        status: "pending"
    });

    const preference = await createPreference({
        "items": [
            {
                "title": product.title,
                "description": "Batman dark knight trilogy",
                "picture_url": "http://www.hottoys.com.hk/photos/aUQy/PNbrv1EUFqHIVllOMn1EdV0WsL7b5wTbI317.jpg?1648925180546",
                "category_id": "car_electronics",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": product.price
            }
        ],
        "back_urls": {
            "success": "http://www.hottoys.com.hk/",
            "pending": "https://apx.school/pending-payments"
        },
        "external_reference": order.id,
        "notification_url": "https://dwf-m9-pagos.vercel.app/api/webhooks/mercadopago",
    });

    res.send({
        url: preference.init_point,
    });
}

const handler = method({
    post: postHandler,
});

export default authMiddleware(handler);