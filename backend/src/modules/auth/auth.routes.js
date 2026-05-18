const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('./auth.controller');
const { verifyToken } = require('./auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
