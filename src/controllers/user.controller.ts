import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";

import {Image} from "../models/schemas/image.model";
import {user} from "../models/schemas/user.model";

export class UserController {
    static async getEditUsers(req, res) {
        try {
            const currentUser = await user.findOne({_id: req.user.id});
            res.render('user/updateUser', {user: currentUser});
        } catch (err) {
            console.log(err.message)
            res.redirect('/')
        }
    }

    static async postEditUsers(req, res) {
        try {
            const currentUser = await user.findOne({_id: req.user.id});
            if (currentUser) {
                await currentUser.updateOne({...req.body});
                res.redirect('/me-profile');
            }
        } catch (err) {
            console.log("-------------" + err);
        }
    }
}