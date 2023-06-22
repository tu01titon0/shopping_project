import { Schema,model } from "mongoose";
interface Iproduct{
    id: number;
    name: string;
    model: string;
    place: string;
    category_id: number;
    vote: number;
    created_at: Date;
}
const productSchema = new Schema<Iproduct>({
    id: Number,
    name: String,
    model: String,
    place: String,
    category_id: Number,
    vote: Number,
    created_at: Date,
})
const Product = model<Iproduct>('Product',productSchema)
export  {Product}