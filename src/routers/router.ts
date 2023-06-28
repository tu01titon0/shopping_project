import express from "express";
import {Router} from "express"
import passport from "../middlewares/home.middlewares";

const router = Router()
import HomeController from "../controllers/home.controller";
import ProfileUserController from "../controllers/profileUser.controller";
import {ProductController} from "../controllers/product.controller";
import {AdminController} from "../controllers/admin.controller";
import {CartController} from "../controllers/cart.controller"
import {UserController} from "../controllers/user.controller"
;

router.get('/', HomeController.getHomePage)
router.get('/ProfileUser', ProfileUserController.getManagerUserPage)

router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/register', HomeController.getRegisterPage)
router.post('/register', HomeController.postRegisterPage)

router.get('/product', ProductController.productDetail);

router.get('/search', ProductController.searchProducts);

router.get('/new-product', AdminController.newProduct);
router.post('/new-product', AdminController.createProduct)

router.get('/new_category', AdminController.newCategory)
router.post('/new_category', AdminController.createCategory)

router.get('/list-product', AdminController.showProducts)
router.get('/list-category', AdminController.showCategories)

router.post('/add_to_cart', CartController.addProductToCart);

router.get('/cart', CartController.getCartPage);

router.get('/me-profile',  UserController.getEditUsers);
router.post('/me-profile', UserController.postEditUsers);
router.get('/me-change-password', UserController.getChangePassword);
router.post('/me-change-password', UserController.postChangePassword);
router.get('/deleteProduct/:id', AdminController.deleteProduct);

router.get('/editProduct/:id', AdminController.showEditProduct);
router.post('/editProduct/:id', AdminController.editProduct);

router.get('/deleteCategory/:id', AdminController.deleteCategory);
router.get('/editCategory/:id', AdminController.showEditCategory);
router.post('/editCategory/:id', AdminController.editCategory);



router.get(
    '/login/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
);
router.get(
    '/google/callback',

    passport.authenticate('google'),

    (req, res) => {
        res.send('You are authenticated');
    }
);

router.get('/login/facebook', passport.authenticate('facebook', {scope: ['profile', 'email']}));

router.get(
    "/facebook/callback",
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('*', function (req, res) {
    res.render('notfound')
});
export default router