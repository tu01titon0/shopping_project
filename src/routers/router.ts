import express from "express";
import { Router } from "express"
import passport from "../middlewares/home.middlewares";
const router = Router()
import HomeController from "../controllers/home.controller";
import ProfileUserController from "../controllers/profileUser.controller";
import {ProductController} from "../controllers/product.controller";

router.get('/', HomeController.getHomePage)
router.get('/ProfileUser', ProfileUserController.getManagerUserPage)

router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/product', ProductController.productDetail);

router.get('/search', ProductController.searchProducts);

router.get('/new_product', ProductController.newProduct);
router.post('/new_product', ProductController.createProduct)

router.get('/new_category', ProductController.newCategory)
router.post('/new_category', ProductController.createCategory)

// router.get('/product/:id', ProductController.createCategory)//ServerLOad
router.get('/product', ProductController.createCategory)// Code chạy


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