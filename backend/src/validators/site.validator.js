const { body } = require('express-validator');

/**
 * Validation rules for POST /api/sites
 */
const createSiteRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Site name is required.')
    .isLength({ min: 2, max: 150 }).withMessage('Site name must be between 2 and 150 characters.'),

  body('templateId')
    .optional()
    .isMongoId().withMessage('Template ID must be a valid MongoDB ID.'),
];

/**
 * Validation rules for PUT /api/sites/:siteId
 */
const updateSiteRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 }).withMessage('Site name must be between 2 and 150 characters.'),
];

module.exports = { createSiteRules, updateSiteRules };
