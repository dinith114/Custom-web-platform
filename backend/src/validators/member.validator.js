const { body } = require('express-validator');

/**
 * Validation rules for POST /api/sites/:siteId/members/invite
 */
const inviteMemberRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required.')
    .isIn(['editor', 'viewer'])
    .withMessage('Role must be either "editor" or "viewer".'),
];

/**
 * Validation rules for PUT /api/sites/:siteId/members/:memberId
 */
const updateMemberRoleRules = [
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required.')
    .isIn(['editor', 'viewer'])
    .withMessage('Role must be either "editor" or "viewer".'),
];

module.exports = { inviteMemberRules, updateMemberRoleRules };
