import {Product} from "../models/schemas/product.model";

export class ProductController {
    static async productDetail(req, res) {
        const productID = req.query.id;
        const product = await Product.findOne({_id: productID}).populate('category_id');
        res.render('productDetail', {user: req.user, product});
    }
}