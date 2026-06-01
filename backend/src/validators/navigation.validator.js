const { body } = require('express-validator');

/**
 * Validation rules for PUT /api/sites/:siteId/navigation
 */
const updateNavigationRules = [
  body('items')
    .isArray().withMessage('Navigation items must be an array.'),

  body('items.*.id')
    .notEmpty().withMessage('Each navigation item must have an id.'),

  body('items.*.label')
    .trim()
    .notEmpty().withMessage('Each navigation item must have a label.'),

  body('items.*.order')
    .optional()
    .isInt({ min: 0 }).withMessage('Order must be a non-negative integer.'),

  body('items.*.url')
    .optional({ values: 'null' }),

  body('items.*.isVisible')
    .optional()
    .isBoolean().withMessage('isVisible must be a boolean.'),

  body('items.*.children')
    .optional()
    .isArray().withMessage('children must be an array.'),
];

module.exports = { updateNavigationRules };
