import { Schema,model } from "mongoose";
const productDetailSchema = new Schema({
    color: String,
    price: Number,
    quantity: Number,
    product_id:  { type: Schema.Types.ObjectId, ref:"product"},
})
const ProductDetail = model('ProductDetail',productDetailSchema)
export  {ProductDetail}