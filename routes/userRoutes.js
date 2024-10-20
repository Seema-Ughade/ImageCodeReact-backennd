const express = require('express');
const singleUpload = require('../middlewares/multer'); // Ensure this points to your multer configuration
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Create a new user with image upload
router.post('/', singleUpload, createUser); // For creating a new user

// Get all users
router.get('/', getAllUsers); // For fetching all users

// Get a user by ID
router.get('/:id', getUserById); // For fetching a single user by ID

// Update a user by ID with image upload
router.put('/:id', singleUpload, updateUser); // For updating a user by ID

// Delete a user by ID
router.delete('/:id', deleteUser); // For deleting a user by ID

module.exports = router;
