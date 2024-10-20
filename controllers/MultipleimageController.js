const User = require('../models/Mulitpleimage');
const cloudinary = require('../middlewares/cloudinaryConfig');
const getDataUri = require('../utils/dataUri');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const images = req.files; // Use req.files to get multiple images
    const imageUrls = await Promise.all(images.map(async (image) => {
      const fileUri = getDataUri(image).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      return result.secure_url;
    }));

    const newUser = new User({
      name,
      email,
      password,
      images: imageUrls,
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }
    const user = await User.findById(id);
    // ...rest of the code
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

    const images = req.files; // Use req.files to get new images
    const imageUrls = images.length > 0 ? await Promise.all(images.map(async (image) => {
      const fileUri = getDataUri(image).content;
      const result = await cloudinary.uploader.upload(fileUri, { resource_type: 'auto' });
      return result.secure_url;
    })) : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        ...(imageUrls && { images: imageUrls }), // Update images only if new ones are provided
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
