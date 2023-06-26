import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

export class ProductController {
    static async productDetail(req, res) {
        try{
            const productID = req.query.id;
            const product = await Product.findOne({_id: productID}).populate('category_id');
            const images = await Image.find({product_id: productID});
           return  res.render('productDetail', {user: req.user, product, images});
        }catch (err){
            console.log(err)
        }
    }
}