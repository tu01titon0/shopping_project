import express = require('express');
import bodyParser from "body-parser";
import path from "path";
import router from "./src/routers/router";

const app = express();
const port = 2759

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}))

app.use(express.static('./src/views'))
app.use(express.static('another_static_folder'))
app.use(express.static('./src/public'))

app.set('view engine',"ejs")
app.set("views", "./src/views")

app.use(router);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})