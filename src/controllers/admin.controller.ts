import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";

import {Image} from "../models/schemas/image.model";
import {user} from "../models/schemas/user.model";
import {model} from "mongoose";

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
            res.redirect('/new-product')
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

    static  async deleteProduct(req, res) {
        try {
            await Product.findByIdAndDelete(req.params.id);
            console.log('Sản phẩm đã được xóa thành công');
            res.redirect('/list-product')
        } catch (error) {
            console.error(error.message);
        }
    }

    static async showEditProduct(req, res) {
        const product = await Product.findOne({_id: req.params.id})
        const categories = await Category.find();
        res.render('admin/editProduct', { product, categories })
    }

    static async showEditCategory(req, res) {
        const category = await Category.findOne({_id: req.params.id})
        console.log(category)
        res.render('admin/editCategory', { category })
    }

    static async editProduct(req, res) {
        try {
            const product = await Product.findOne({_id: req.params.id})
            let {name, model, place, category_id, color, price, quantity, status, description} = req.body;
            product.name = name;
            product.model = model;
            product.place = place;
            product.category_id = category_id;
            product.color = color;
            product.price = price;
            product.quantity = quantity;
            product.status = status;
            product.description = description;
            if(await product.save()) {
                console.log('Sản phẩm đã được edit thành công');
                res.redirect('/list-product')
            } else {
                res.redirect(`/editProduct/${product.id}`)
            }
        } catch (error) {
            console.error(error.message);
            res.redirect('/list-product')
        }
    }

    static async editCategory(req, res) {
        try {
            const category = await Category.findOne({_id: req.params.id})
            let {name} = req.body;
            category.name = name;

            if(await category.save()) {
                console.log('Danh muc edit thành công');
                res.redirect('/list-category')
            } else {
                res.redirect(`/editCategory/${category.id}`)
            }
        } catch (error) {
            console.error(error.message);
            res.redirect('/list-category')
        }
    }


    static async showCategories(req, res){
        const categories = await Category.find();
        res.render('admin/listCategory', { categories });
    }


    static async deleteCategory(req, res) {
        try {
            await Category.findByIdAndDelete(req.params.id);
            console.log('Danh muc đã được xóa thành công');
            res.redirect(`/list-category`);
        } catch (error) {
            console.error(error.message);
            res.redirect(`/`);
        }
    }
}