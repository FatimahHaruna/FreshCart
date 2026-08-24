const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json({success: true, count: products.length, products});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to get products.', error: error.message});
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, product});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to get product.', error: error.message});
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const products = await Product.find({category: req.params.categoryId}).populate('category');
        res.status(200).json({success: true, count: products.length, products});
    }
    catch(error) {
        res.status(500).json({success: true, message: 'Failed to get products by category', error: error.message});
    }
};

module.exports = { getAllProducts, getProductById, getProductByCategory };