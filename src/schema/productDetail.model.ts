import { Schema,model } from "mongoose";
interface IproductDetail{
    id:number;
    color: string;
    price: number;
    quantity: number;
    product_id: number;
}
const productDetailSchema = new Schema<IproductDetail>({
    id:Number,
    color: String,
    price: Number,
    quantity: Number,
    product_id: Number,
})
const ProductDetail = model<IproductDetail>('ProductDetail',productDetailSchema)
export  {ProductDetail}