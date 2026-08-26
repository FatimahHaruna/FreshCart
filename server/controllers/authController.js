const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function validatePassword(password) {
    if (!password || password.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must include at least one number.';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Password must include at least one special character (!@#$%^&* etc.).';
    return null;
}

const registerUser = async (req, res) => {
    try {
        const { userName, email, password, phoneNumber, addresses } = req.body;
        if(!userName || !email || !password) {
            return res.status(400).json({success: false, message: 'Required field missing!'});
        }
        const pwdError = validatePassword(password);
        if(pwdError) {
            return res.status(400).json({success: false, message: pwdError });
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(409).json({success: false, message: 'User with this email already exists!'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({success: false, message: 'Email and password are required!'});
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({success: false, message: 'User not found!'});
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.status(401).json({success: false, message: 'Invalid email or password!'});
        }

        const token = jwt.sign( {userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).json({success: true, message: 'Login successful', token, user: {
            id: user._id, name: user.userName, email: user.email, phone: user.phoneNumber, address: user.addresses
        }});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to log in User.', error: error.message});
    }

};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        res.status(200).json({success: true, user});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed to get user profile.', error: error.message});
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const {name, phoneNumber, addresses} = req.body;
        
        const user = await User.findById(req.user.userId);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        if(name) user.name = name;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(addresses) user.addresses = addresses;

        await user.save();
        res.status(200).json({success: true, message: 'Profile updated successfully', user: { 
            id: user._id, name: user.name, email: user.email, phone: user.phoneNumber ,address: user.addresses
        }});
    }
    catch(error) {
        res.status(500).json({success: false, message: 'Failed', error: error.message});
    }
};

//Add functionality for reset password later

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };