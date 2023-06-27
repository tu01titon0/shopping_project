import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";

import {Image} from "../models/schemas/image.model";
import {user} from "../models/schemas/user.model";

export class UserController {
    static async getEditUsers(req,res){
        try {
            console.log(req.user)
            const User = await user.findOne({id:req.user._id})
            res.render('user/updateUser', {User:User,user: req.user})
        }catch (err) {
            console.log(err.message)
            res.redirect('/')
        }
    }
}