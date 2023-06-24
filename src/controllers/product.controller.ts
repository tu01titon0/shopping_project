import {Product} from "../models/schemas/product.model";

export class ProductController {
    static async productDetail(req, res) {
        const productID = req.params.id;
        const product = await Product.findOne({_id: productID});
        res.render('productDetail', {user: req.user, product});
    }
}