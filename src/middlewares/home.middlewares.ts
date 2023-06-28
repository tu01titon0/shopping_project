import passport, {use} from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {user} from "../models/schemas/user.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {Category} from "../models/schemas/category.model";
import {productCart} from "../models/schemas/productCart.model";

const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user: any, cb) => {

    process.nextTick(() => {
        cb(null, {id: user._id, username: user.userName, role: user.role});
    });
});

passport.deserializeUser((user: any, cb) => {

    process.nextTick(() => {
        return cb(null, user);
    });
});

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb: any) {
    const User = await user.findOne({userName: username});
    const product = await Product.find();
    const image = await Image.find();
    const category = await Category.find();
    const ProductCart = await productCart.find();
    if (!User) {
        return cb(null, false, {message: 'Incorrect username or password.'});
    }
    if (User.password !== password) {
        return cb(null, false, {message: 'Incorrect username or password.'});
    }
    return cb(null, User);
}))

passport.use(new FacebookStrategy({
        clientID: '1477331943075937',
        clientSecret: 'ce977f6da247d275e4ccfcdb8de56ccf',
        callbackURL: 'http://localhost:2759/facebook/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const existUser = await user.findOne({'facebook.id': profile.id});
            if (existUser) {
                return cb(null, existUser);
            }
            console.log('Creating new user...');
            const newUser = new user({
                facebook: {
                    id: profile.id,
                },
                username: profile.emails[0].value,
                password: null
            });
            await newUser.save();
            console.log(newUser, 'newUser')
            return cb(null, newUser);
        } catch (error) {
            return cb(null, false);
        }
    }
))

export default passport;