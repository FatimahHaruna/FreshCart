const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, unique: true, enum: ['Fruits', 'Vegetables', 'Leafy Greens', 'Root Vegetables', 'Herbs'] },
        description: { type: String, required: true, trim: true },
        image: { type: String, required: true }
    },
    { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;