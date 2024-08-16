const productlistController = require('../Controllers/productlistController');
const express = require('express');
const router = express.Router();
router.post('/addProduct', productlistController.addProduct);
router.get('/getProduct', productlistController.getProduct);
module.exports = router;