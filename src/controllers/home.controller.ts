import {Product} from "../models/schemas/product.model";

class HomeController {
    static getHomePage(req: any, res: any): any {
        const listProduct = Product.find()
        console.log(listProduct)
        res.render('index')
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login')
    }
}

export default HomeController;