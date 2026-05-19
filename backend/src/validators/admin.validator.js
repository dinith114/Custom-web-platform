const { body, param } = require('express-validator');

/**
 * Validation rules for PUT /api/admin/users/:userId/status
 */
const updateUserStatusRules = [
  param('userId')
    .isMongoId().withMessage('User ID must be a valid MongoDB ID.'),

  body('status')
    .notEmpty().withMessage('Status is required.')
    .isIn(['active', 'suspended']).withMessage('Status must be either active or suspended.'),
];

/**
 * Validation rules for DELETE /api/admin/sites/:siteId
 */
const adminDeleteSiteRules = [
  param('siteId')
    .isMongoId().withMessage('Site ID must be a valid MongoDB ID.'),
];

module.exports = { updateUserStatusRules, adminDeleteSiteRules };
