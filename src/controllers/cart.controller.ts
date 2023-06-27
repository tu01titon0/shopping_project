import {productCart} from "../models/schemas/productCart.model";
import e from "express";

export class CartController {
    static async addProductToCart(req, res) {
        console.log(req.body);
        if (req.user) {
            let cart = await productCart.findOne({user_id: req.user.id})
            let newCart
            if (!cart) {
                newCart = new productCart();
                newCart.user_id = req.user.id;
            } else {
                newCart = cart;
            }
            newCart.product_id.push(req.body.productID);
            await newCart.save();
            console.log()
            res.send(`${cart.product_id.length}`);
        } else {
            res.render('/login')
        }
    }

    static async getCartPage(req, res) {
        res.render('cart', {user: req.user});
    }
}