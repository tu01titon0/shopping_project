import { Schema,model } from "mongoose";

const imageSchema = new Schema({
    imageUrl: String,
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
})

export const Image = model('Image',imageSchema)