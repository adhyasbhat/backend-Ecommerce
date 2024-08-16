const userController = require('../Controllers/userController');
const express = require('express');
const router = express.Router();
router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);
router.post('addtocart', userController.userCart);
router.post('userwishlist', userController.userWishlist);
module.exports = router;