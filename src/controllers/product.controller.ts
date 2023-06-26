import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";
import {Image} from "../models/schemas/image.model";

export class ProductController {
    static async productDetail(req, res) {
        const productID = req.query.id;
        const product = await Product.findOne({_id: productID}).populate('category_id');
        const images = await Image.find({product_id: productID});
        res.render('productDetail', {user: req.user, product, images});
    }

    static async searchProducts(req, res) {
        try {
            let page = +req.query.page;
            page = page ? page : 1;
            let limit = 8;
            let offset = Math.ceil((page - 1) * limit);
            const keywordSearch = req.query.keyword || '';
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
            const productsLimit = await Product.find({
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
            }).populate('category_id').limit(limit).skip(offset);
            let totalPage = Math.ceil(products.length / limit);
            const imageArray = await Promise.all(productsLimit.map(product => Image.find({product_id: product._id})));
            const view = req.query.views;
            const grid = (view === 'grid');
            res.render('productsSearch', {
                user: req.user,
                products: productsLimit,
                imageArray,
                keywordSearch,
                grid,
                numberPage: totalPage,
                currentPage: page
            });
        } catch (err) {
            console.log(err.message);
        }
    }
}