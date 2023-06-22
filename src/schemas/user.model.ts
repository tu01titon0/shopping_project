import {Schema, model} from "mongoose";
interface IUser {
    userName : string;
    image_Id : number;
    email : string;
    role : string;
    password : string;
    address : string;
}
const userSchema = new Schema<IUser>({
    userName : String,
    image_Id : Number,
    email : String,
    role : String,
    password : String,
    address : String
})
const user =  model<IUser>("user",userSchema);
export {user}