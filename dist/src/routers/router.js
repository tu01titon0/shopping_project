"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const home_controller_1 = __importDefault(require("../controllers/home.controller"));
router.get('/', (req, res) => {
    home_controller_1.default.getHomePage(req, res);
});
exports.default = router;
//# sourceMappingURL=router.js.map