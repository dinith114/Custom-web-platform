const { body } = require('express-validator');

/**
 * Validation rules for POST /api/auth/register
 */
const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/).withMessage('Password must contain at least one number.'),
];

/**
 * Validation rules for POST /api/auth/login
 */
const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.'),

  body('password')
    .notEmpty().withMessage('Password is required.'),
];

/**
 * Validation rules for PUT /api/auth/profile
 */
const updateProfileRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),

  body('avatarUrl')
    .optional()
    .isURL().withMessage('Avatar URL must be a valid URL.'),
];

module.exports = { registerRules, loginRules, updateProfileRules };
