import { Schema,model } from "mongoose";
interface IProductCart {
    price_id : number;
    user_id : number
}
const productCartSchema = new Schema <IProductCart>({
    price_id : Number,
    user_id : Number,
})
const productCart =  model<IProductCart>("user",productCartSchema);
export {productCart}
