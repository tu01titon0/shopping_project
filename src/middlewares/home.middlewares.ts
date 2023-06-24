import passport from "passport";
import LocalStrategy from "passport-local";
import {user} from "../models/schemas/user.model";
import {Product} from "../models/schemas/product.model";
import {Image} from "../models/schemas/image.model";
import {Category} from "../models/schemas/category.model";
import {productCart} from "../models/schemas/productCart.model";

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

passport.deserializeUser((user: any, cb) => {
    
    process.nextTick(() => {
        return cb(null, user);
    });
});

export default passport;