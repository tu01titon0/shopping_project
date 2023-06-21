"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const General = require("./src/controller/general");
const app = express();
const port = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express.static('./src/views'));
app.use(express.static('another_static_folder'));
app.set('view engine', "ejs");
app.set("views", "./src/views");
app.get("/", General.General.getHomePage);
app.get("/login", General.General.GetLoginPage);
app.get("/register", General.General.GetRegisterPage);
app.get("/not", General.General.GetNotFoundPage);
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map