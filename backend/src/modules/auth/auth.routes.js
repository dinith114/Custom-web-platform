const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('./auth.controller');
const { verifyToken } = require('./auth.middleware');
const { registerRules, loginRules, updateProfileRules } = require('../../validators/auth.validator');
const validate = require('../../middleware/validate');

// Public routes
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);

// Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfileRules, validate, updateProfile);

module.exports = router;
