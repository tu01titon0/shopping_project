import { Schema,model } from "mongoose";
const productCartSchema = new Schema ({
    product_id :  [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user_id :  { type: Schema.Types.ObjectId, ref: "user" },
})
const productCart =  model("productCart", productCartSchema);
export {productCart}
