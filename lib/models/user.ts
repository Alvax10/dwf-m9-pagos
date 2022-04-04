import { firestore } from "lib/firestore";

const collection = firestore.collection("users");
export class User {
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

    static async createUser(data) {
        const newUserSnap = await collection.add(data);
        const newUser = new User(newUserSnap.id);
        newUser.data = data;

        return newUser;
    }
}