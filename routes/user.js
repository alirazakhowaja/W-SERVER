// Example usage of createUser function
const express = require('express');
const router = express.Router();
const createUser = require('../controllers/user');

// Route to handle user creation
router.post('/', createUser);

module.exports = router;