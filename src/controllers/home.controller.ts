class HomeController {
    static getHomePage(req: any, res: any): any {
        res.render('index')
    }
    static getLoginPage(req: any, res: any): any {
        res.render('dangnhap')
    }
}

export default HomeController;