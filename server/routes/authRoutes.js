const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPassword, getUserProfile, updateUserProfile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;