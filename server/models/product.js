const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      price: { type: Number, required: true, min: 0 },
      category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
      image: { type: String, required: true, trim: true },
      stock: { type: Number, required: true, min: 0, default: 0 },
      unitQuantity: { type: String, required: true },
      isAvailabe: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
