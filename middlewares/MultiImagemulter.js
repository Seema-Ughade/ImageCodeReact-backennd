const multer = require('multer');

// Use memory storage for uploading files
const storage = multer.memoryStorage();

// Set up multer to accept multiple files with the field name 'images' (matching your frontend)
const upload = multer({ storage }).array('images', 10); // Accept a maximum of 10 files

// Export the upload middleware
module.exports = upload;
