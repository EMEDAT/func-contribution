const express = require('express');
const cors = require('cors');
const base64Encode = require('./base64Encode'); // Import the base64 encoding router

const app = express();
app.use(express.json());
app.use(cors());

// Route for the homepage
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Base64 Encode API!</h1>
    <p>Use <a href="/api/functions/base64Encode">/api/functions/base64Encode</a> for encoding.</p>
  `);
});

// Mount the base64 encode router
app.use('/functions/base64Encode', base64Encode);

module.exports = app; // Export the app for Vercel
