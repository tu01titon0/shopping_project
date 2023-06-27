import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import loginMiddlewares from "../middlewares/login.middlewares";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try{

            const products = await Product.find().populate('category_id');
            const ProductNew = await Product.find().sort({"created_at": -1})
            const images = await Promise.all(products.map(product => Image.find({product_id: product._id})))
            const imagesNew = await Promise.all(ProductNew.map(product => Image.find({product_id: product._id})))
            return  res.render('index', {user: req.user, product:products, images,ProductNew,imagesNew});
        }catch (err){
            console.log(err)
        }
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login', {user: req.user})
    }
}

export default HomeController;