import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try{
            const productID = req.params.id;
            const product = await Product.findOne({_id: productID}).populate('category_id');
            const images = await Image.find({product_id: productID});
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