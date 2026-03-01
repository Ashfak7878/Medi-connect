const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
  registerController, 
  loginController, 
  getUserDataController, 
  applyDoctorController, 
  bookAppointmentController, 
  getAllApprovedDoctorsController 
} = require('../controllers/userCtrl');

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================
router.post('/register', registerController);
router.post('/login', loginController);

// ==========================================
// PROTECTED ROUTES
// ==========================================
router.post('/getUserData', authMiddleware, getUserDataController);
router.post('/apply-doctor', authMiddleware, applyDoctorController);
router.post('/book-appointment', authMiddleware, bookAppointmentController);
router.get('/getAllDoctors', authMiddleware, getAllApprovedDoctorsController);

module.exports = router;