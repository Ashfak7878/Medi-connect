const mongoose = require('mongoose');

// 1. Define the Rules (The Schema)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // Rule: Must have a name
  },
  email: {
    type: String,
    required: [true, 'Email is required'], // Rule: Must have an email
    unique: true, // Rule: No two users can have the exact same email
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // Rule: Must have a password
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    default: 'patient', // Rule: If not specified, they are a patient
  }
}, { timestamps: true }); // Automatically adds the exact date/time they registered

// 2. Build the Model using the rules above
const userModel = mongoose.model('users', userSchema);

// 3. Export it so your controller (recipe) can use it
module.exports = userModel;