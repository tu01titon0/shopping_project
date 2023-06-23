import { Schema,model } from "mongoose";

const imageSchema = new Schema({
    imageUrl: String,
    detail_id: Number
})

export const Image = model('Image',imageSchema)