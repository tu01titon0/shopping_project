import {Schema, model} from "mongoose";

const catenogySchema = new Schema({
    name: String
})
export const Category = model('Category', catenogySchema)

