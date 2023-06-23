class HomeController {
    static getHomePage(req: any, res: any): any {
        res.render('index')
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login')
    }
}

export default HomeController;