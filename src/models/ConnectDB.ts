import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopping_project');
        // await mongoose.connect('mongodb+srv://tu01titon0:Tu123@cluster0.tnqcj0z.mongodb.net/');

    }
}