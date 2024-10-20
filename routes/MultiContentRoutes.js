// routes/multipleimageRoutes.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
  } = require('../controllers/MultiContentController');const upload = require('../middlewares/MultiImagemulter'); // Import the multer configuration

// Define routes
router.post('/', upload, createUser); // Use the upload middleware for multiple file uploads
router.get('/new', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', upload, updateUser); // Use the upload middleware for multiple file uploads
router.delete('/:id', deleteUser);

module.exports = router;
