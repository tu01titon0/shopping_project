import { Schema,model } from "mongoose";
const productSchema = new Schema({
    name: String,
    model: String,
    place: String,
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    vote: Number,
    created_at: Date,
})
const Product = model('Product',productSchema)
export  {Product}