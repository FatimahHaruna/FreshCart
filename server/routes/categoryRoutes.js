const express = require('express');
const router = express.Router();
const { getCategories, getCategoriesById } = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategoriesById);

module.exports = router;