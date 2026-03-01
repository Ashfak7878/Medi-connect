const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { doctorAppointmentsController, updateStatusController } = require('../controllers/doctorCtrl');
const router = express.Router();

// GET METHOD || FETCH DOCTOR APPOINTMENTS
router.get('/doctor-appointments', authMiddleware, doctorAppointmentsController);

// POST METHOD || UPDATE APPOINTMENT STATUS
router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;