class HomeController {
    static getHomePage(req: any, res: any): any {
        res.render('index', {user: req.user});
    }
    static getLoginPage(req: any, res: any): any {
        res.render('login', {user: req.user})
    }
}

export default HomeController;