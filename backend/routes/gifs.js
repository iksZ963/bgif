const express = require("express");
const multer = require("multer");
const path = require("path");
const Gif = require("../models/Gif");
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
  },
});

// File filter to accept only GIF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/gif") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only GIF files are allowed."), false);
  }
};

// Initialize Multer with storage and file filter settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Route to handle GIF upload
router.post("/upload", upload.single("gifFile"), async (req, res) => {
  try {
    // Retrieve title and file path from request
    const { title, tags } = req.body;
    const filePath = req.file.path;

    // Convert tags to an array, split by commas
    const tagArray = tags ? tags.split(",").map((tag) => tag.trim()) : [];

    // Create new GIF entry in the database
    const newGif = new Gif({
      title: title,
      url: filePath, // Assuming URL is the file path on the server
      uploadedBy: "Anonymous", // Replace with actual user data if implementing user authentication
      createdAt: new Date(),
      tags: tagArray, // Optional: include tags if available
    });

    await newGif.save();

    // Send success response
    res
      .status(200)
      .json({ message: "GIF uploaded successfully!", gif: newGif });
  } catch (error) {
    console.error('Error uploading GIF:', error);
    res.status(500).json({ message: "Server Error: Could not upload GIF" });
  }
});

// Route to retrieve a paginated list of GIFs
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const gifs = await Gif.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Gif.countDocuments();
    const hasMore = total > page * limit;

    res.json({
      gifs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
