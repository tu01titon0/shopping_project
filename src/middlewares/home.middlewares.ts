import passport from "passport";
import LocalStrategy from "passport-local";
import {user} from "../models/schemas/user.model";

passport.use(new LocalStrategy(async function verify(username: string, password: string, cb:any){
    const User = await user.findOne({userName: username});
    if (!User) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    if (User.password !== password) {
        return cb(null, false, { message: 'Incorrect username or password.' });
    }
    
    return cb(null, user);
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