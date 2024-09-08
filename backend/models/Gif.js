const mongoose = require('mongoose');

const GifSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Gif', GifSchema);
