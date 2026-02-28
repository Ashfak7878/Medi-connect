const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
// ==========================================
// 1. REGISTER RECIPE
// ==========================================
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: 'User already exists', success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: 'Registered Successfully', success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: `Register Controller Error ${error.message}` });
  }
};

// ==========================================
// 2. LOGIN RECIPE
// ==========================================
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

// ==========================================
// 3. VIP DATA RECIPE
// ==========================================
const getUserDataController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({ message: 'User not found', success: false });
    } else {
      user.password = undefined; 
      res.status(200).send({ success: true, data: user });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Auth error', success: false, error });
  }
};
// ==========================================
// 4. APPLY DOCTOR RECIPE
// ==========================================
const applyDoctorController = async (req, res) => {
  try {
    // 1. Create a new doctor application using the data from the request body.
    // Notice how the 'status' is hardcoded to 'pending' by default in our model!
    const newDoctor = await doctorModel({ ...req.body, status: 'pending' });
    
    // 2. Save it to the MongoDB database
    await newDoctor.save();

    // 3. Send a success message back to the user
    res.status(201).send({
      success: true,
      message: 'Doctor Application Submitted Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Applying For Doctor',
    });
  }
};

// Export all three recipes!
module.exports = { registerController, loginController, getUserDataController, applyDoctorController };