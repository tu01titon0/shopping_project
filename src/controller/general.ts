export class General{
    constructor() {
    }
     static getHomePage(req, res) {
        res.render('index')
    }
    static GetLoginPage(req, res) {
        res.render('dangnhap')
    }
    static GetRegisterPage(req, res) {
        res.render('dangky')
    }
    static GetNotFoundPage(req, res) {
        res.render('notFound')
    }

}
