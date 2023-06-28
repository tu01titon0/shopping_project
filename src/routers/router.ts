import {Router} from "express"
import passport from "../middlewares/home.middlewares";

const router = Router()
import HomeController from "../controllers/home.controller";
import ProfileUserController from "../controllers/profileUser.controller";
import {ProductController} from "../controllers/product.controller";
import {AdminController} from "../controllers/admin.controller";
import {CartController} from "../controllers/cart.controller";
import {UserController} from "../controllers/user.controller";

router.get('/', HomeController.getHomePage)
router.get('/ProfileUser', ensureAuthenticated, ProfileUserController.getManagerUserPage)

router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/register', HomeController.getRegisterPage)
router.post('/register', HomeController.postRegisterPage)

router.get('/product', ProductController.productDetail);

router.get('/search', ProductController.searchProducts);

router.get('/new_product', ensureAuthenticated, AdminController.newProduct);
router.post('/new_product', ensureAuthenticated, AdminController.createProduct)

router.get('/new_category', ensureAuthenticated, AdminController.newCategory)
router.post('/new_category', ensureAuthenticated, AdminController.createCategory)

router.get('/list_product', ensureAuthenticated, AdminController.showProducts)
router.get('/list_category', ensureAuthenticated, AdminController.createCategory)

router.post('/add_to_cart', CartController.addProductToCart);

router.get('/cart', CartController.getCartPage);

router.get('/me-profile', UserController.getEditUsers);

router.post('/me-profile', UserController.postEditUsers);

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get(
    "/google/callback",
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/');
    }
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'})
);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/');
}

router.get('*', function (req, res) {
    res.render('notfound')
});
export default router