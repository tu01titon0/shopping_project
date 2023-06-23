import {Schema, model} from "mongoose";
const userSchema = new Schema({
    userName : String,
    image_Id :  { type: Schema.Types.ObjectId, ref: "image" },
    email : String,
    role : String,
    password : String,
    address : String
})
const user =  model("user",userSchema);
export {user}