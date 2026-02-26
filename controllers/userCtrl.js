const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Added the wristband tool

// --- REGISTER CONTROLLER (Keep your existing one here) ---
const registerController = async (req, res) => {
    // ... your working code is here ...
};

// --- NEW: LOGIN CONTROLLER ---
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email }); 
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: 'Invalid Email or Password', success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).send({ message: 'Login Success', success: true, token: token });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

// Make sure to export BOTH recipes now!
module.exports = { registerController, loginController };