// models/multipleimage.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  content: {
    type: [String], // Array of content strings
    required: true,
  },
});

const User = mongoose.model('content', userSchema);
module.exports = User;
