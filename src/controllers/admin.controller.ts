import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";

import {Image} from "../models/schemas/image.model";

export class AdminController {
    static async newProduct(req, res) {
        const categories = await Category.find();
        res.render('admin/newProduct', {user: req.user, categories: categories});
    }

    static  async newCategory(req, res) {
        res.render('admin/newCategory', {user: req.user});
    }
    static async createProduct(req, res) {
        const arrImg = req.body.image.slice(0, -1).split(';')
        const product = new Product(req.body);
        if (await product.save()){
            for (let i = 0; i < arrImg.length; i++) {
                const image = new Image({
                    imageUrl: arrImg[i],
                    product_id: product._id
                });
                await image.save();
            }
            res.redirect('/ProfileUser')
        } else {
            res.redirect('/new_product')
        }
    }

    static async createCategory(req, res) {
        const category = new Category(req.body);
        if (await category.save()){
            res.redirect('/ProfileUser')
        } else {
            res.redirect('/new_category')
        }
    }

    static  async showProducts(req, res) {
        const  products = await Product.find();
        res.render('admin/listProduct', { products })
    }
}