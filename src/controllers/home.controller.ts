import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try{

            const product = await Product.find().populate('category_id');
            const images = await Image.findOne({product_id: product[0]._id.toString()});
            return  res.render('index', {user: req.user, product, images});
        }catch (err){
            console.log(err)
        }
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login', {user: req.user})
    }
}

export default HomeController;