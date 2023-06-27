import express from "express";
import { Router } from "express"
import passport from "../middlewares/home.middlewares";
const router = Router()
import HomeController from "../controllers/home.controller";
import ProfileUserController from "../controllers/profileUser.controller";
import {ProductController} from "../controllers/product.controller";
import {AdminController} from "../controllers/admin.controller";
import {UserController} from "../controllers/user.controller";

router.get('/', HomeController.getHomePage)
router.get('/ProfileUser', ProfileUserController.getManagerUserPage)

router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/product', ProductController.productDetail);

router.get('/search', ProductController.searchProducts);

router.get('/new_product', AdminController.newProduct);
router.post('/new_product', AdminController.createProduct)

router.get('/new_category', AdminController.newCategory)
router.post('/new_category', AdminController.createCategory)

router.get('/list_product', AdminController.showProducts)
router.get('/list_category', AdminController.createCategory)
router.get('/list_user', AdminController.getListUsers)
router.get('/editUser', UserController.getListUsers)


// router.get(
//     '/login/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );
// router.get(
//     '/google/callback',

//     passport.authenticate('google'),

//     (req, res) => {
//         res.send('You are authenticated');
//     }
// );
router.get('*', function (req, res){
    res.render('notfound')
});
export default router