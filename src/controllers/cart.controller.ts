import {productCart} from "../models/schemas/productCart.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";


export class CartController {
    static async addProductToCart(req, res) {
        if (req.user) {
            let cart = await productCart.findOne({ user_id: req.user.id });
            let newCart = cart || new productCart();
            let productCarts = newCart.products;
            console.log(productCarts)
            console.log(req.body.productID)
            let existingProduct = productCarts.find(item => item.product.toString() === req.body.productID);
            console.log(existingProduct)
            let item = await Product.findOne({_id: req.body.productID})
            let img = await Image.findOne({product_id: req.body.productID})
            if (existingProduct) {
                existingProduct.quantity += +req.body.quantity;
            } else {
                productCarts.push({ product: req.body.productID, quantity: +req.body.quantity , name: item.name, price: item.price, image: img.imageUrl});
            }
            newCart.user_id = req.user.id
            await newCart.save();
            let totalQuantity = productCarts.reduce((total, item) => total + item.quantity, 0);
            res.send(`${totalQuantity}`);
        } else {
            res.redirect('/login');
        }
    }


    static async getCartPage(req, res) {
        if (req.user){
            let cart = await productCart.findOne({ user_id: req.user.id });
            res.render('cart/index', { products : cart ? cart.products : [] });
        } else {
            res.redirect('/login');
        }
    }
    static async deleteProductCart(req, res) {
        console.log(req.body)
        try {
            const cart = await productCart.findOne({ user_id: req.user.id });
            const updatedProductCart = await productCart.findOneAndUpdate(
                { _id: cart._id },
                { $pull: { products: { _id: req.body.productId } } },
                { new: true }
            );

            if (updatedProductCart) {
                console.log('Product removed successfully from productCart:', updatedProductCart);
                const new_cart = await productCart.findOne({ user_id: req.user.id });
                const totalQuantity = new_cart ? new_cart.products.reduce((total, item) => total + item.quantity, 0) : 0;
                res.send(`${totalQuantity}`);
            } else {
                console.log('ProductCart not found');
                res.status(404).send('ProductCart not found');
            }
        } catch (error) {
            console.log('Error removing product from productCart:', error);
            res.status(500).send('Error removing product from productCart');

        }
    }

}