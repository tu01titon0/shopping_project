import {Product} from "../models/schemas/product.model";
import {Category} from "../models/schemas/category.model";

import {Image} from "../models/schemas/image.model";
import {user} from "../models/schemas/user.model";

export class UserController {
    static async getListUsers(req,res){
        const User = await user.findOne({id:req.user._id})
        res.render('user/updateUser', {User:User})
    }
}