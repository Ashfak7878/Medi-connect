const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

// ==========================================
// 1. GET ALL DOCTORS RECIPE
// ==========================================
const getAllDoctorsController = async (req, res) => {
  try {
    // Go to the database and grab EVERY doctor application
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: 'Doctors Data Fetched Successfully',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while fetching doctors',
      error,
    });
  }
};

// ==========================================
// 2. CHANGE DOCTOR STATUS RECIPE
// ==========================================
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    
    // 1. Find the specific doctor application and update its status (e.g., to "approved")
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });

    // 2. Find the original User who submitted this, and officially make them a Doctor!
   // Find the original User who submitted this
    const user = await userModel.findOne({ _id: doctor.userId });
    
    // SAFETY NET: If the user doesn't have a notification array yet, create an empty one!
    if (!user.notification) {
        user.notification = [];
    }

    // Create a notification for the user
    user.notification.push({
      type: 'doctor-account-request-updated',
      message: `Your Doctor Account Request has been ${status}`,
    });
    
    // If the Admin approved them, change their role from 'patient' to 'doctor'
    if (status === 'approved') {
      user.isDoctor = true;
    }
    
    // Save the updated user file back to the database
    await user.save();

    res.status(201).send({
      success: true,
      message: 'Account Status Updated Successfully',
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Account Status',
      error,
    });
  }
};

module.exports = { getAllDoctorsController, changeAccountStatusController };