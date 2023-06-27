import {Schema, model} from "mongoose";
const userSchema = new Schema({
    google: {
        id: {
        type: String
        }
        },
    userName : String,
    image_Id :  { type: Schema.Types.ObjectId, ref: "Image" },
    email : String,
    role : String,
    password : String,
    address : String
})


const user =  model("user",userSchema);
export {user}