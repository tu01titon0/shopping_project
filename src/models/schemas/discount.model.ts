import {model} from "mongoose";

const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    percent: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    expiration_date: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    }
});


export const Discount = model('Discount',discountSchema)