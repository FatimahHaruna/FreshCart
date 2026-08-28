const Order = require('../models/order');
const Cart = require('../models/cart');

const createOrder = async (req, res, next) => {
    try {
        const {shippingAddress} = req.body;
        if(!shippingAddress) {
            return res.status(400).json({success: false, message: 'Shipping address required.'})
        }

        const cart = await Cart.findOne({user: req.user.userId}).populate('items.product');

        if(!cart || cart.items.length === 0) {
            return res.status(400).json({success: false, message: 'Your cart is empty.'});
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            subtotal: item.product.price * item.quantity
        }));

        const totalAmount = orderItems.reduce((total, item) => total + item.subtotal, 0);

        const order = await Order.create({
            user: req.user.userId,
            items: orderItems,
            totalAmount,
            shippingAdress: shippingAddress
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({success: true, message: 'Order created successfully.', order});
    }
    catch(error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({user: req.user.userId}).populate('items.product');
        res.status(200).json({success: true, count: orders.length, orders});
    }
    catch(error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user.userId}).populate('items.product');

        if(!order) {
            return res.status(404).json({success: false, message: 'Order not found.'});
        }
        res.status(200).json({success: true, order});
    }
    catch(error) {
        next(error);
    }
};

module.exports = { createOrder, getMyOrders, getOrderById };