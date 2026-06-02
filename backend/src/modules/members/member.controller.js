const SiteMember = require('./member.model');
const User = require('../users/user.model');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * GET /api/sites/:siteId/members
 * List all members of a site (owner only)
 */
const listMembers = async (req, res) => {
  const { siteId } = req.params;

  const members = await SiteMember.find({ siteId })
    .populate('userId', 'name email avatarUrl role status')
    .sort({ invitedAt: 1 });

  res.json(successResponse(members, 'Site members retrieved successfully.'));
};

/**
 * POST /api/sites/:siteId/members/invite
 * Invite a user by email and assign a role (owner only)
 */
const inviteMember = async (req, res) => {
  const { siteId } = req.params;
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json(errorResponse('Email is required.'));
  }

  if (!role || !['editor', 'viewer'].includes(role)) {
    return res
      .status(400)
      .json(errorResponse('Role must be either "editor" or "viewer".'));
  }

  // Find the user to invite
  const userToInvite = await User.findOne({ email });
  if (!userToInvite) {
    return res
      .status(404)
      .json(errorResponse('No user found with this email address.'));
  }

  // Can't invite yourself
  if (userToInvite._id.toString() === req.user.id) {
    return res
      .status(400)
      .json(errorResponse('You cannot invite yourself to your own site.'));
  }

  // Check if already a member
  const existingMember = await SiteMember.findOne({
    siteId,
    userId: userToInvite._id,
  });

  if (existingMember) {
    return res
      .status(409)
      .json(errorResponse('This user is already a member of this site.'));
  }

  const member = await SiteMember.create({
    siteId,
    userId: userToInvite._id,
    role,
  });

  // Populate user info before returning
  await member.populate('userId', 'name email avatarUrl role status');

  res.status(201).json(successResponse(member, 'Member invited successfully.'));
};

/**
 * PUT /api/sites/:siteId/members/:memberId
 * Change a member's role (owner only)
 */
const updateMemberRole = async (req, res) => {
  const { siteId, memberId } = req.params;
  const { role } = req.body;

  if (!role || !['editor', 'viewer'].includes(role)) {
    return res
      .status(400)
      .json(errorResponse('Role must be either "editor" or "viewer".'));
  }

  const member = await SiteMember.findOne({ _id: memberId, siteId });
  if (!member) {
    return res.status(404).json(errorResponse('Member not found.'));
  }

  // Can't change the owner's role
  if (member.role === 'owner') {
    return res
      .status(403)
      .json(errorResponse('Cannot change the owner\'s role.'));
  }

  member.role = role;
  await member.save();

  await member.populate('userId', 'name email avatarUrl role status');

  res.json(successResponse(member, 'Member role updated successfully.'));
};

/**
 * DELETE /api/sites/:siteId/members/:memberId
 * Remove a member from the site (owner only)
 */
const removeMember = async (req, res) => {
  const { siteId, memberId } = req.params;

  const member = await SiteMember.findOne({ _id: memberId, siteId });
  if (!member) {
    return res.status(404).json(errorResponse('Member not found.'));
  }

  // Can't remove the owner
  if (member.role === 'owner') {
    return res
      .status(403)
      .json(errorResponse('Cannot remove the site owner.'));
  }

  await SiteMember.findByIdAndDelete(memberId);

  res.json(successResponse(null, 'Member removed successfully.'));
};

module.exports = { listMembers, inviteMember, updateMemberRole, removeMember };
