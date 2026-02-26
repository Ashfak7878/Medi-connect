const express = require('express');
const { registerController, loginController } = require('../controllers/userCtrl'); // Added loginController here

const router = express.Router();

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController); // The new menu item

module.exports = router;