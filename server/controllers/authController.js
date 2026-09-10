const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function validatePassword(password) {
    if (!password || password.length < 8) {
        return 'Password must be at least 8 characters.';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must include at least one uppercase letter.';
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must include at least one number.';
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        return 'Password must include at least one special character (!@#$%^&* etc.).';
    }

    return null;
}

const registerUser = async (req, res, next) => {
    try {
        const { userName, email, password, phoneNumber, addresses } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Required field missing!'
            });
        }

        const pwdError = validatePassword(password);
        if (pwdError) {
            return res.status(400).json({
                success: false,
                message: pwdError
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            phoneNumber,
            addresses
        });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            user: {
                id: user._id,
                name: user.userName,
                email: user.email,
                phone: user.phoneNumber,
                address: user.addresses
            }
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required!'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found!'
            });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password!'
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.userName,
                email: user.email,
                phone: user.phoneNumber,
                address: user.addresses
            }
        });
    } catch (error) {
        next(error);
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const { userName, phoneNumber, addresses } = req.body;

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (userName) user.userName = userName;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (addresses) user.addresses = addresses;

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.userName,
                email: user.email,
                phone: user.phoneNumber,
                address: user.addresses
            }
        });
    } catch (error) {
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Email and new password are required!'
            });
        }

        const pwdError = validatePassword(newPassword);
        if (pwdError) {
            return res.status(400).json({
                success: false,
                message: pwdError
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully.'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    resetPassword
};