const Product = require('../models/product');
require('../models/category');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({success: true, count: products.length, products});
    }
    catch(error) {
        next(error);
    }
};

const getProductByCategory = async (req, res, next) => {
    try {
        const products = await Product.find({category: req.params.categoryId}).populate('category');
        res.status(200).json({success: true, count: products.length, products});
    }
    catch(error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, product});
    }
    catch(error) {
        next(error);
    }
};
module.exports = { getAllProducts, getProductByCategory, getProductById };