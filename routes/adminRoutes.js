const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl.js');

const router = express.Router();

// GET METHOD || FETCH ALL DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// POST METHOD || CHANGE DOCTOR STATUS
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController);

module.exports = router;