import express = require('express');
import bodyParser from "body-parser";
import path from "path";
import router from "./src/routers/router";
import passport from "passport";
import session from "express-session";
import livereload from "connect-livereload";
import {ConnectDB} from "./src/models/ConnectDB";

const app = express();
const port = 2759

const db = new ConnectDB();
db.connect().then(r => {
    // tslint:disable-next-line:no-console
    console.log( `connect database successfully` );
}).catch(err => {
    // tslint:disable-next-line:no-console
    console.log( `connect database error` );
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))

app.use(express.static('./src/views'))
app.use(express.static('another_static_folder'))
app.use(express.static('./src/public'))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(livereload());
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine',"ejs")
app.set("views", "./src/views")
app.use(router);
app.use('/',router);
// viet middlewares chinh sua res

// app.use((req: any, res: any, next: any)=> {
//     if (req.isAuthenticated()) {
//         res.locals.userLogin = req.user
//         next();
//     } else {
//         res.redirect('/login')
//     }
// })

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})