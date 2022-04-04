import { firestore } from "lib/firestore";

type OrderData = {
    status: "pending" | "closed" | "failed",
}

const collection = firestore.collection("auth");
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
    
    static async createNewOrder(newOrderData) {
        const newOrderSnap = await collection.add(newOrderData);
        const newOrder = new Order(newOrderSnap.id);
        newOrder.data = newOrderData;

        return newOrder;
    }
}