const express = require('express');
const multer = require('multer');
const path = require('path');
const Gif = require('../models/Gif');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
    }
});

// File filter to accept only GIF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only GIF files are allowed.'), false);
    }
};

// Initialize Multer with storage and file filter settings
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// Route to handle GIF upload
router.post('/upload', upload.single('gifFile'), async (req, res) => {
    try {
        // Retrieve title and file path from request
        const { title } = req.body;
        const filePath = req.file.path;

        // Create new GIF entry in the database
        const newGif = new Gif({
            title: title,
            url: filePath, // Assuming URL is the file path on the server
            uploadedBy: 'Anonymous', // Replace with actual user data if implementing user authentication
            createdAt: new Date(),
            tags: [] // Optional: include tags if available
        });

        await newGif.save();

        // Send success response
        res.status(200).json({ message: 'GIF uploaded successfully!', gif: newGif });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error: Could not upload GIF' });
    }
});

// Route to retrieve a list of GIFs
router.get('/', async (req, res) => {
    try {
        const gifs = await Gif.find({}); // Fetch all GIFs from the database
        res.json(gifs); // Return the GIFs as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
