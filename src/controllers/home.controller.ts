class HomeController {
    static getHomePage(req: any, res: any): any {
        res.render('index')
    }
}
export default HomeController;