import {Schema, model} from "mongoose";

const orderDetailSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: "user"},
    status: String,
    product_id: {type: Schema.Types.ObjectId, ref: "Product"},
    quantity: Number
});

const OrderDetail = model('OrderDetail', orderDetailSchema);

export {OrderDetail};