import express from "express";
import { Router } from "express"
import passport from "../middlewares/home.middlewares";
const router = Router()

import HomeController from "../controllers/home.controller";
import {user} from "../models/schemas/user.model";

router.get('/', HomeController.getHomePage)


router.get('/login', HomeController.getLoginPage);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login123'
}));
router.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',

    passport.authenticate('google'),

    (req, res) => {
        res.send('You are authenticated');
    }
);




export default router