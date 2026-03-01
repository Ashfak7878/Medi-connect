const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

// ==========================================
// 1. GET DOCTOR APPOINTMENTS RECIPE
// ==========================================
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({ doctorId: doctor._id });
    
    res.status(200).send({
      success: true,
      message: 'Doctor Appointments Fetched Successfully',
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error in fetching Doctor Appointments',
    });
  }
};

// ==========================================
// 2. UPDATE APPOINTMENT STATUS RECIPE
// ==========================================
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });

    const user = await userModel.findOne({ _id: appointments.userId });
    
    if (!user.notification) {
      user.notification = [];
    }

    user.notification.push({
      type: 'status-updated',
      message: `Your appointment status has been updated to ${status}`,
      onClickPath: '/doctor-appointments'
    });
    
    await user.save();

    res.status(200).send({
      success: true,
      message: 'Appointment Status Updated Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error In Update Status',
    });
  }
};

module.exports = { doctorAppointmentsController, updateStatusController };