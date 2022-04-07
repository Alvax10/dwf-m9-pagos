import { firestore } from "lib/firestore";
import { User } from "./user";

const collection = firestore.collection("order");
export class Order {
    ref: FirebaseFirestore.DocumentReference;
    data: any;
    id: string;
    constructor(id) {
        this.id = id;
        this.ref = collection.doc(id);
    }

    async pullData() {
        const snap = await this.ref.get();
        this.data = snap.data();
    }

    async pushData() {
        this.ref.update(this.data);
    }

    static async findUserEmail(userIdFromOrder) {
        const userFounded = new User(userIdFromOrder);
        if (userFounded) {
            await userFounded.pullData();
            const email = userFounded.data.email;
            return email;

        } else {
            console.error("El usuario no existe");
            return null;
        }
    }
    
    static async createNewOrder(newOrderData = {}) {
        const newOrderSnap = await collection.add(newOrderData);
        const newOrder = new Order(newOrderSnap.id);
        newOrder.data = newOrderData;

        return newOrder;
    }
}