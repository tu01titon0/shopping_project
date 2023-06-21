"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.General = void 0;
class General {
    constructor() {
    }
    static getHomePage(req, res) {
        res.render('index');
    }
    static GetLoginPage(req, res) {
        res.render('dangnhap');
    }
    static GetRegisterPage(req, res) {
        res.render('dangky');
    }
    static GetNotFoundPage(req, res) {
        res.render('notFound');
    }
}
exports.General = General;
//# sourceMappingURL=general.js.map