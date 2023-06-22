import { Schema,model } from "mongoose";
const productCartSchema = new Schema ({
    detail_id :  { type: Schema.Types.ObjectId, ref: "productDetail" },
    user_id :  { type: Schema.Types.ObjectId, ref: "user" },
})
const productCart =  model("user",productCartSchema);
export {productCart}
