import HomeController from "./home.controller";
class ProfileUser {
    static getManagerUserPage(req: any, res: any): any {
        res.render('managerUser', {user: req.user})
    }
}
export default ProfileUser;