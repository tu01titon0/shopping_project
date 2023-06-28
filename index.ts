import express = require('express');
import bodyParser from "body-parser";
import path from "path";
import router from "./src/routers/router";
import {ConnectDB} from "./src/models/ConnectDB";
import passport from "passport";
import session from "express-session";
import livereload from "connect-livereload";
import {productCart} from "./src/models/schemas/productCart.model";

const app = express();
const port = 2759

const db = new ConnectDB();
db.connect().then(r => {
    console.log(`connect database successfully`);
}).catch(err => {
    console.log(`connect database error`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static('./src/public'))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(livereload());
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', "ejs")
app.set("views", "./src/views")

app.use(async (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
        try {
            const cart = await productCart.findOne({ user_id: req.user.id }).exec();
            const totalQuantity = cart ? cart.products.reduce((total, item) => total + item.quantity, 0) : 0;
            res.locals.userLogin = req.user;
            res.locals.carttotal = totalQuantity;
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    }
    next();
});
app.use(router);
// app.use('/',router);

// viet middlewares chinh sua res




app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})