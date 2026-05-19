const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseHelper');

/**
 * Middleware to run after express-validator checks.
 * If there are validation errors, return 400 with the error messages.
 * Otherwise, continue to the controller.
 *
 * Usage in routes:
 *   const { registerRules } = require('../../validators/auth.validator');
 *   const validate = require('../../middleware/validate');
 *   router.post('/register', registerRules, validate, register);
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return res.status(400).json(errorResponse('Validation failed', messages));
  }

  next();
};

module.exports = validate;
