const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require('../controllers/cartController');
const protect = require('../middlewares/authMiddleware');

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.put('/:productId', protect, updateCart);
router.delete('/productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;