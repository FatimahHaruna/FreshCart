const Cart = require('../models/cart');
const Product = require('../models/user');

const getCart = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error);
    }
}

const getCart = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error);
    }
}

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({user: req.user.userId}).populate('items.product');
        if(!cart) {
            return res.status(200).json({success: true, cart : {user: req.user.userId, items: []}});
        }
        res.status(200).json({success: true, cart: {user: req.user.userId, cart}});
    }
    catch(error) {
        next(error);
    }
}

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        if(!productId || !quantity) {
            return res.status(400).json({success: false, message: 'Product ID and quantity are required.'});
        }

        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found.'});
        }

        let cart = await Cart.findOne({user: req.user.userId});
        if(!cart) {
            cart = await Cart.create({user: req.user.userId, items: [ { product: productId, quantity }]});
            res.status(200).json({success: true, message: 'Product added to cart', cart});
        }

        const existingItem = await Cart.items.find(item => item.product.toString() === productId);
        if(existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({product: productId, quantity});
        }
        await cart.save();
        res.status(200).json({success: true, message: 'Product added to cart.', cart})
    }
    catch(error) {
        next(error);
    }
}

const updateCart = async (req, res, next) => {
    try {
        
    }
    catch(error) {
        next(error);
    }
}

const removeFromCart = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error);
    }
}

const clearCart = async (req, res, next) => {
    try {

    }
    catch(error) {
        next(error);
    }
}