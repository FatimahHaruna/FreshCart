const Category = require('../models/category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true, count: categories.length, categories});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to get categories', error: error.message});
    }
};

const getCategoriesById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
            return res.status(404).json({success: false, message: 'Category not found'});
        }
        res.status(200).json({success: true, category});
    }
    catch(error) {
        res.status(500).json({success: true, message: 'Failed to get category', error: error.message});
    }
};

module.exports = { getCategories, getCategoriesById }