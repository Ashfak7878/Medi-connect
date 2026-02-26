const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// dotenv config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());

// --- THIS IS THE NEW PART ---
// routes
app.use('/api/v1/user', require('./routes/userRoutes'));
// ----------------------------

// port
const port = process.env.PORT || 5000;

// listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV || 'development'} Mode on port ${port}`
  );
});