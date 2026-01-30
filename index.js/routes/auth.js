const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// Ye line user ko link karti hai logic se
router.post('/register', register);
router.post('/login', login);

module.exports = router;
