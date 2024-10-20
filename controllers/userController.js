const User = require('../models/userModel');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Initialize variable for the image URL
    let imageUrl = null;

    // Check if there is an image file to upload
    if (req.file) {
      const fileUri = getDataUri(req.file).content;

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'auto',
      });

      imageUrl = result.secure_url; // Get the secure URL from Cloudinary response
    }

    const newUser = new User({
      name,
      email,
      password,
      image: imageUrl,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Read all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Read a single user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Initialize variable for the image URL
    let imageUrl = null;

    // Check if there is an image file to upload
    if (req.file) {
      const fileUri = getDataUri(req.file).content;

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(fileUri, {
        resource_type: 'auto',
      });

      imageUrl = result.secure_url; // Get the secure URL from Cloudinary response
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        image: imageUrl, // Update image only if a new one is provided
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
