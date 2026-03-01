const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

// ==========================================
// 1. GET ALL USERS RECIPE
// ==========================================
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: 'Users Data List',
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while fetching users',
      error,
    });
  }
};

// ==========================================
// 2. GET ALL DOCTORS RECIPE
// ==========================================
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: 'Doctors Data List',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while getting doctors data',
      error,
    });
  }
};

// ==========================================
// 3. CHANGE ACCOUNT STATUS RECIPE (Approve/Reject)
// ==========================================
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    
    // Find the specific doctor application and update the status
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });

    // Find the original User who submitted this application
    const user = await userModel.findOne({ _id: doctor.userId });
    
    // SAFETY NET: If the user doesn't have a notification array yet, create an empty one!
    if (!user.notification) {
        user.notification = [];
    }

    // Push a notification to the user letting them know the result
    user.notification.push({
      type: 'doctor-account-request-updated',
      message: `Your Doctor Account Request has been ${status}`,
      onClickPath: '/notification'
    });

    // If the admin approved them, officially upgrade their account to a Doctor!
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

module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusController };