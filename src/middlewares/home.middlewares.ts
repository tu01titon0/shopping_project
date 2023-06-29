import passport, {use} from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {user} from "../models/schemas/user.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {Category} from "../models/schemas/category.model";
import {productCart} from "../models/schemas/productCart.model";
import GoogleStrategy from "passport-google-oauth20";

const FacebookStrategy = require('passport-facebook').Strategy;
import GoogleStrategy from "passport-google-oauth20";

passport.serializeUser((user: any, cb) => {
    process.nextTick(() => {
        cb(null, {id: user._id, username: user.userName, role: user.role, address: user.address, email: user.email});
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

passport.use(new GoogleStrategy({
        clientID: '959089008601-ts6s5svs355n0lea0keq0v8pkj90os7b.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:2759/google/callback',
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            const existUser = await user.findOne({'google.id': profile.id});
            if (existUser) {
                return done(null, existUser);
            }
            const newUser = new user({
                google: {
                    id: profile.id,
                },
                userName: profile._json.name,
                email: profile._json.email,
                role: 'user'
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(null, false);
        }
    }
))

passport.use(new FacebookStrategy({
        clientID: '1477331943075937',
        clientSecret: 'ce977f6da247d275e4ccfcdb8de56ccf',
        callbackURL: 'http://localhost:2759/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existUser = await user.findOne({'facebook.id': profile.id});
            if (existUser) {
                return done(null, existUser);
            }
            const newUser = new user({
                facebook: {
                    id: profile.id,
                },
                userName: profile.displayName,
                role: 'user'
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(null, false);
        }
    }));

export default passport;