import {Discount} from "../models/schemas/discount.model";
import HomeController from "./home.controller";
import {productCart} from "../models/schemas/productCart.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";

class DiscountController {
    static getDiscount(req: any, res: any) {
        res.render('discount/new')
    }
    static async createDiscount(req: any, res: any){
        const discount = new Discount(req.body);
        if (await discount.save()){
            res.redirect('/new-discount')
        }else{
            res.redirect('/new-discount')
        }
    }

    static async getListDiscount(req:any, res:any){
        const  discounts = await Discount.find()
        res.render('discount/list', {discounts})
    }

    static async checkDisCountCode(req:any, res:any){
        const discount = await Discount.findOne({code: req.body.code})
        let numberDiscount = 0
        if (discount){
            numberDiscount = discount.percent
        }
        res.send(`${numberDiscount}`);
    }


}
export default DiscountController;