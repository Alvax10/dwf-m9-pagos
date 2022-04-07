import { Order } from "lib/models/order";
import { User } from "lib/models/user";
import method from "micro-method-router";
import { authMiddleware } from "lib/middleWares";
import { createPreference } from "lib/mercadopago";
import { NextApiRequest, NextApiResponse} from "next";
import { sendConfirmedEmail, sendProductBoughtEmail } from "lib/sendgrid";

const products = {
    1234: {
        "title": "Batman hot toys",
        "price": 100000,
    }
}

async function postHandler(req: NextApiRequest, res: NextApiResponse, token) {
    const { productId } = req.query as any;
    const productIdToNumber = parseInt(productId);
    console.log("productIdToNumber: ", productIdToNumber);
    
    const product = products[productIdToNumber];
    console.log("Este es el product: ", product);

    if (!product) {
        res.status(404).send({ message: "Producto no encontrado" });
    }

    const order = await Order.createNewOrder({
        additionalInfo: req.body,
        productId: productIdToNumber,
        userId: token.userId,
        status: 'pending'
    });

    const email = await Order.findUserEmail(token.userId);

    const preference = await createPreference({
        "items": [
            {
                "title": product.title,
                "description": "Batman dark knight trilogy",
                "picture_url": "http://www.hottoys.com.hk/photos/aUQy/PNbrv1EUFqHIVllOMn1EdV0WsL7b5wTbI317.jpg?1648925180546",
                "category_id": "DC_toys",
                "quantity": 1,
                "currency_id": "ARS",
                "unit_price": product.price
            }
        ],
        "back_urls": {
            "success": "http://www.hottoys.com.hk/",
        },
        "external_reference": order.id,
        "notification_url": "https://dwf-m9-pagos.vercel.app/api/webhooks/mercadopago",
    });

    console.log("Esta es la orden en crearOrden: ", order);
    await sendConfirmedEmail(email);
    await sendProductBoughtEmail(email, preference["items"]);
    
    res.send({ url: preference.init_point });
}

const handler = method({
    post: postHandler,
});

export default authMiddleware(handler);