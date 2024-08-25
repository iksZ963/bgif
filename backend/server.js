require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from bgif backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
