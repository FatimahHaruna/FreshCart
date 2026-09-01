const User = require('../models/user');

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }
        res.status(200).json({success: true, user});
    }
    catch(error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
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
        next(error);
    }
};

module.exports = { getUserProfile, updateUserProfile };
