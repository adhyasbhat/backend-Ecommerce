const mongoose = require('mongoose');

// Define the Product schema reference
const productSchemaRef = {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
};

// Cart Schema
const cartSchema = new mongoose.Schema({
    productId: productSchemaRef,
    quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure quantity is at least 1
    },
}, { _id: false }); // Disable automatic creation of an _id field for subdocuments

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    productId: productSchemaRef,
}, { _id: false });
// Purchase History Schema
const purchaseHistorySchema = new mongoose.Schema({
    productId: productSchemaRef,
    quantity: {
        type: Number,
        required: true,
        min: 1, 
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { _id: false }); // Disable automatic creation of an _id field for subdocuments

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        match: [/.+@.+\..+/, 'Invalid email address'], // Basic email validation
    },
    password: {
        type: String,
        required: true,
    },
    cartData: [cartSchema],
    wishlistData: [wishlistSchema],
    productHistoryData: [purchaseHistorySchema],
});

module.exports = mongoose.model('User', userSchema);
