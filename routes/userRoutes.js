const express = require('express');
const { registerController, loginController, getUserDataController } = require('../controllers/userCtrl');

// Bring in the Bouncer!
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

// Public Routes (Anyone can access these without a wristband)
router.post('/register', registerController);
router.post('/login', loginController);

// VIP Protected Route (You MUST pass the authMiddleware to reach the controller)
router.post('/getUserData', authMiddleware, getUserDataController); 

module.exports = router;