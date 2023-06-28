import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {user} from "../models/schemas/user.model";
import bcrypt from "bcrypt";

class HomeController {
    static async getHomePage(req: any, res: any) {
        try {

            const products = await Product.find().populate('category_id');
            const ProductNew = await Product.find().sort({"created_at": -1})
            const images = await Promise.all(products.map(product => Image.find({product_id: product._id})))
            const imagesNew = await Promise.all(ProductNew.map(product => Image.find({product_id: product._id})))
            return res.render('index', {
                user: req.user,
                product: products,
                images,
                ProductNew,
                imagesNew,
                messages: req.flash('registerSuccess')
            });
        } catch (err) {
            console.log(err)
        }
    }

    static getLoginPage(req: any, res: any): any {
        res.render('login', {user: req.user})
    }

    static getRegisterPage(req: any, res: any): any {
        res.render('register', {user: req.user || undefined, messages: req.flash('registerReject')});
    }

    static async postRegisterPage(req: any, res: any) {
        try {
            const userName = await user.findOne({userName: req.body.username})
            if (!userName) {
                const passwordHash = await bcrypt.hash(req.body.password, 10);
                const newUser = new user({
                    userName: req.body.username,
                    password: passwordHash,
                    address: req.body.address,
                    email: req.body.mail,
                    role: 'user'
                })
                await newUser.save()
                req.flash('registerSuccess', 'Đăng ký thành công! Vui lòng đăng nhập.');
                res.redirect('/')

            } else {
                req.flash('registerReject', 'Tên đăng nhập đã tồn tại! Vui lòng nhập tên đăng nhập khác.');
                res.redirect('/register');
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default HomeController;