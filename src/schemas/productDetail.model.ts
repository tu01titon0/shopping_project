import { Schema,model } from "mongoose";
interface IProductDetail{
    id:number;
    color: string;
    price: number;
    quantity: number;
    product_id: number;
}
const productDetailSchema = new Schema<IProductDetail>({
    id:Number,
    color: String,
    price: Number,
    quantity: Number,
    product_id: Number,
})
const ProductDetail = model<IProductDetail>('ProductDetail',productDetailSchema)
export  {ProductDetail}