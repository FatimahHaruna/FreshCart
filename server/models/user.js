const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, minlength: 7 },
    phoneNumber: { type: String, trim: true },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

module.exports = User;
