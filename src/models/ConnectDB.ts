import mongoose from "mongoose";

export class ConnectDB {
    async connect() {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopping_project');
    }
}