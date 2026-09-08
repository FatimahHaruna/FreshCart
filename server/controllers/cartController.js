const Cart = require('../models/cart');
const Product = require('../models/product');

const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    user: req.user.userId,
                    items: []
                }
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        next(error);
    }
};

const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and quantity are required.'
            });
        }

        const parsedQuantity = Number(quantity);
        if (Number.isNaN(parsedQuantity) || parsedQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1.'
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found.'
            });
        }

        let cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId,
                items: [{ product: productId, quantity: parsedQuantity }]
            });

            return res.status(200).json({
                success: true,
                message: 'Product added to cart',
                cart
            });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += parsedQuantity;
        } else {
            cart.items.push({ product: productId, quantity: parsedQuantity });
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product added to cart.',
            cart
        });
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const parsedQuantity = Number(quantity);

        if (!quantity || Number.isNaN(parsedQuantity) || parsedQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1.'
            });
        }

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(item => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Product not found in cart.'
            });
        }

        item.quantity = parsedQuantity;
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart updated successfully.',
            cart
        });
    } catch (error) {
        next(error);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found.'
            });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Product removed from cart.'
        });
    } catch (error) {
        next(error);
    }
};

const clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found.'
            });
        }

        cart.items = [];
        await cart.save();

        return res.status(200).json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart
};