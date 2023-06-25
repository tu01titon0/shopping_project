import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

export class ProductController {
    static async productDetail(req, res) {
        try{
            const productID = req.params.id;
            console.log(productID)
            const product = await Product.findOne({_id: productID}).populate('category_id');
            console.log(product)
            const images = await Image.find({product_id: productID});
            console.log(images)
           // return  res.render('productDetail', {user: req.user, product, images});
            res.render('login')
        }catch (err){
            console.log(err)
        }
    }
}