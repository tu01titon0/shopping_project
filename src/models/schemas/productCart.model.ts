import { Schema,model } from "mongoose";
const productCartSchema = new Schema ({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
            name: String,
            price: Number,
            image: String
        }
    ],
    product_id :  [{ type: Schema.Types.ObjectId, ref: "Product" }],
    user_id :  { type: Schema.Types.ObjectId, ref: "user" },
})
const productCart =  model("productCart", productCartSchema);
export {productCart}
