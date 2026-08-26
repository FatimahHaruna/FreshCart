const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log(req);
    try {
        const { userName, email, password, phoneNumber, addresses } = req.body;
        if(!userName || !email || !password || !phoneNumber || !addresses) {
            return res.status(400).json({success: false, message: 'Required field missing!'});
        }
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({success: false, message: 'User with this email already exists!'});
        }

        //Hashing password code here
        const user = await User.create({ userName, email, password: hashedPassword, phoneNumber, addresses });
        res.status(201).json({success: true, message: 'User registered successfully!', user: {
            id: user._id, name: user.userName, email: user.email, phone: user.phoneNumber, address: user.address
        }});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to register user.', error: error.message});
    }
};

const loginUser = async (req, res) => {

};

const getUserProfile = async (req, res) => {

};

const updateUserProfile = async (req, res) => {

};

registerUser();