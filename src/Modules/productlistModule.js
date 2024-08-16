const e = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stockQuantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    discount:{
        type: Number,
    },
});
module.exports = mongoose.model('Product', productSchema);