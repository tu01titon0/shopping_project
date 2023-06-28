import {Schema, model} from "mongoose";

const orderDetailSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    product_id :  [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user_id :  { type: Schema.Types.ObjectId, ref: "user" },
    status: { type: String, default: "Pending" }
});

const OrderDetail = model('OrderDetail', orderDetailSchema);

export {OrderDetail};