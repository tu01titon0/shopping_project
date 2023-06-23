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
// let newUser = new user({
//         userName : "duc anh",
//         email : "duc2710203",
//         role : "admin",
//         password : "123",
//         address : "ngũ phúc kim thành hải dương"
// }
// );
//
// // Lưu tài liệu vào cơ sở dữ liệu
// newUser.save()
//     .then(() => {
//         console.log('Đã lưu tài liệu vào MongoDB');
//     })
//     .catch((error) => {
//         console.error('Lỗi lưu tài liệu vào MongoDB:', error);
//     });
export {user}