const express = require('express');
const { registerController, loginController, getUserDataController, applyDoctorController } = require('../controllers/userCtrl');
// Bring in the Bouncer!
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

// Public Routes (Anyone can access these without a wristband)
router.post('/register', registerController);
router.post('/login', loginController);


// VIP Protected Route (You MUST pass the authMiddleware to reach the controller)
router.post('/getUserData', authMiddleware, getUserDataController); 
// Apply Doctor Route (Protected by the Bouncer)
router.post('/apply-doctor', authMiddleware, applyDoctorController);
module.exports = router;