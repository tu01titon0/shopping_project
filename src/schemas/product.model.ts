import { Schema,model } from "mongoose";


interface IProduct{
    name: string;
    model: string;
    place: string;
    category_id: object ;
    vote: number;
    created_at: Date;
}
const productSchema = new Schema<IProduct>({
    name: String,
    model: String,
    place: String,
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    vote: Number,
    created_at: Date,
})
const Product = model<IProduct>('Product',productSchema)
export  {Product}