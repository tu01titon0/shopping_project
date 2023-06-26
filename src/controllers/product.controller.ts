import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {Category} from "../models/schemas/category.model";

export class ProductController {
    static async productDetail(req, res) {
        const productID = req.query.id;
        const product = await Product.findOne({_id: productID}).populate('category_id');
        const images = await Image.find({product_id: productID});
        res.render('productDetail', {user: req.user, product, images});
    }

    static async newProduct(req, res) {
        const categories = await Category.find();
        console.log(categories)
        res.render('admin/newProduct', {user: req.user, categories: categories});
    }

    static  async newCategory(req, res) {
        res.render('admin/newCategory', {user: req.user});
    }
    static async createProduct(req, res) {
        const product = new Product(req.body);
        if (await product.save()){
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

    static async searchProducts(req, res) {
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword !== '') {
                let keywordSearch = req.query.keyword || '';
                const products = await Product.find({
                    $or: [
                        {name: {$regex: keywordSearch, $options: 'i'}},
                        {
                            category_id: {
                                $in: await Category.find({
                                    name: {
                                        $regex: keywordSearch,
                                        $options: 'i'
                                    }
                                }).select('_id')
                            }
                        }
                    ]
                }).populate('category_id');
                let imageArray = [];
                for (const product of products) {
                    const images = await Image.find({product_id: product._id});
                    imageArray.push(images);
                }
                res.render('productsSearch', {user: req.user, products, imageArray, keywordSearch});
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}