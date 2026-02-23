const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); // Imports the dotenv package
const connectDB = require('./config/db'); // Imports your database connection

// 1. Load the secrets from the .env file
dotenv.config();

// 2. Connect to the Database
connectDB();

// Create the Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// A simple test route
app.get('/', (req, res) => {
  res.send('Hello from the MediConnect Backend!');
});

// Define the port (It will try to use the port from .env, or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running beautifully on port ${PORT}`);
});