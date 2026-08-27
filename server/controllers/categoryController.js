const Category = require('../models/category');

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true, count: categories.length, categories});
    }
    catch(error) {
        next(error);
    }
};

const getCategoriesById = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category) {
            return res.status(404).json({success: false, message: 'Category not found'});
        }
        res.status(200).json({success: true, category});
    }
    catch(error) {
        next(error);
    }
};

module.exports = { getCategories, getCategoriesById }