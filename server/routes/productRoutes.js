const express = require('express');
const router = express.Router();
const { getAllProducts, getProductByCategory, getProductById } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductByCategory);
router.get('/:id', getProductById);

module.exports = router;