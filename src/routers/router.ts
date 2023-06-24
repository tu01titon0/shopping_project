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

router.get('/product/:id', ProductController.productDetail);

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

export default router