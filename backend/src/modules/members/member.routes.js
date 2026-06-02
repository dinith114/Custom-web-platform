const express = require('express');
const router = express.Router({ mergeParams: true });
const { verifyToken } = require('../auth/auth.middleware');
const { verifySiteOwner } = require('../../middleware/verifySiteOwner');
const validate = require('../../middleware/validate');
const {
  inviteMemberRules,
  updateMemberRoleRules,
} = require('../../validators/member.validator');

const {
  listMembers,
  inviteMember,
  updateMemberRole,
  removeMember,
} = require('./member.controller');

// All member routes require authentication + site ownership
router.use(verifyToken);
router.use(verifySiteOwner);

router.get('/', listMembers);
router.post('/invite', inviteMemberRules, validate, inviteMember);
router.put('/:memberId', updateMemberRoleRules, validate, updateMemberRole);
router.delete('/:memberId', removeMember);

module.exports = router;
