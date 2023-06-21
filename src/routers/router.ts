import express from "express";
import { Router } from "express"
const router = Router()
import HomeController from "../controllers/home.controller";

router.get('/', (req, res) => {
    HomeController.getHomePage(req, res).catch(err => {
        console.log(err.message);
    })
})

export default router