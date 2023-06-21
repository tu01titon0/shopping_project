import express = require('express');
import bodyParser from "body-parser";
import General = require("./src/controller/general")
const app = express();
const port = Math.floor(Math.random()*(3000 - 1000 + 1)) + 1000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))
app.use(express.static('./src/views'))
app.use(express.static('another_static_folder'))

app.set('view engine',"ejs")
app.set("views", "./src/views")

app.get("/",General.General.getHomePage)
app.get("/login",General.General.GetLoginPage)
app.get("/register",General.General.GetRegisterPage)

app.get("/not",General.General.GetNotFoundPage)
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})