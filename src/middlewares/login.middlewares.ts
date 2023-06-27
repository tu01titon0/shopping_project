import { Strategy as LocalStrategy } from 'passport-local';
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';
import {user} from "../models/schemas/user.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {Category} from "../models/schemas/category.model";
import {productCart} from "../models/schemas/productCart.model";
import passport from "passport";
passport.use(new LocalStrategy(async function verify(username: string, password: string, cb:any){
    const User = await user.findOne({userName: username});
    const product = await Product.find();
    const image = await Image.find();
    const category = await Category.find();
    const ProductCart = await productCart.find();
    if (!User) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (User.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, User);
}))
passport.serializeUser((user: any, cb)  => {
    process.nextTick(() => {
        cb(null, { id: user._id, username: user.userName, role: user.role });
    });
});
passport.use(new GoogleStrategy({

    clientID: "465770968275-bkrqth1cqevh7foidh0m5ditq45s3k1s.apps.googleusercontent.com",
   
    clientSecret: "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",
   
    callbackURL: "http://localhost:2759/auth/google/callback",
   
    passReqToCallback: true
   
   },
   
    async (request, accessToken, refreshToken, profile, done) => {
   
    try {
   
    console.log(profile, 'profile')
   
    let existingUser = await user.findOne({ 'google.id': profile.id });
   
    if (existingUser) {
   
    return done(null, existingUser);
   
    }
   
    console.log('Creating new user...');
   
    const newUser = new user({
   
    google: {
   
    id: profile.id,
   
    },
   
    username: profile.emails[0].value,
   
    password: null
   
    });
   
    await newUser.save();
   
    console.log(newUser, 'newUser')
   
    return done(null, newUser);
   
    } catch (error) {
   
    return done(null, false)
   
    }
   
    }
   
   ));

passport.deserializeUser((user: any, cb) => {
    
    process.nextTick(() => {
        return cb(null, user);
    });
});

export default passport;