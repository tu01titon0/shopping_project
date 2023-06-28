import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import loginMiddlewares from "../middlewares/login.middlewares";
import {user} from "../models/schemas/user.model";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try {

            const products = await Product.find().populate('category_id');
            const ProductNew = await Product.find().sort({"created_at": -1})
            const images = await Promise.all(products.map(product => Image.find({product_id: product._id})))
            const imagesNew = await Promise.all(ProductNew.map(product => Image.find({product_id: product._id})))
            return res.render('./general/index', {user: req.user, product: products, images, ProductNew, imagesNew});
        } catch (err) {
            console.log(err)
        }
    }

    static getLoginPage(req: any, res: any): any {
        res.render('./general/login', {user: req.user})
    }

    static getRegisterPage(req: any, res: any): any {
        res.render('./general/register', {user: req.user || undefined})
    }

    static async postRegisterPage(req: any, res: any) {
        try {
            const userName = await user.findOne({userName: req.body.username})
            if (!userName) {
                const newUser = new user({
                    userName: req.body.username,
                    password: req.body.password,
                    address: req.body.address,
                    email: req.body.mail,
                    role: 'user'
                })
                await newUser.save()
                res.redirect('/')

            } else {
                res.render('./general/register')
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default HomeController;