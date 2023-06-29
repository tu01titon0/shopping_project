import mongoose from "mongoose";

const faker = require('faker');
import {Category} from "./schemas/category.model";
import {Product} from "./schemas/product.model";
import {Image} from "./schemas/image.model";

export class ConnectDB {
    async connect() {
        // await mongoose.connect('mongodb://127.0.0.1:27017/shopping_project');
        await mongoose.connect('mongodb+srv://trankhiem99999:bncvznczvzz1411@cluster0.7tvwpiv.mongodb.net/?retryWrites=true&w=majority');

//         async function createDummyData() {
//             try {
//                 // Tạo 100 danh mục
//                 const categories = [];
//                 for (let i = 0; i < 100; i++) {
//                     const category = new Category({name: `Category ${i + 1}`});
//                     await category.save();
//                     categories.push(category);
//                 }
//
//                 // Tạo 100 sản phẩm ngẫu nhiên và liên kết với danh mục ngẫu nhiên
//                 for (let i = 0; i < 100; i++) {
//                     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//                     const product = new Product({
//                         name: `Product ${i + 1}`,
//                         model: `Model ${i + 1}`,
//                         place: `Place ${i + 1}`,
//                         category_id: randomCategory._id,
//                         vote: Math.floor(Math.random() * 5) + 1,
//                         color: `Color ${i + 1}`,
//                         price: Math.floor(Math.random() * 1000) + 1,
//                         quantity: Math.floor(Math.random() * 10) + 1,
//                         status: 'Active',
//                         description: `Description ${i + 1}`
//                     });
//                     await product.save();
//
//                     // Tạo 3 hình ảnh ngẫu nhiên cho sản phẩm
//                     for (let j = 0; j < 3; j++) {
//                         const imageUrl = faker.image.imageUrl();
//                         const image = new Image({
//                             imageUrl,
//                             product_id: product._id
//                         });
//                         await image.save();
//                     }
//                 }
//
//                 console.log('Dữ liệu đã được tạo thành công!');
//             } catch (error) {
//                 console.error('Lỗi khi tạo dữ liệu:', error);
//             }
//         }
//
// // Gọi hàm để tạo dữ liệu
//         await createDummyData();
    }
}