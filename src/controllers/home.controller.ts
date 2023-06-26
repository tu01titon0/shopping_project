import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try{

            const products = await Product.find().populate('category_id');
            const images = await Promise.all(products.map(product => Image.find({product_id: product._id})))

            return  res.render('index', {user: req.user, product:products, images});
        }catch (err){
            console.log(err)
        }
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login', {user: req.user})
    }
}

export default HomeController;