const User = require('../users/user.model');
const Site = require('../sites/site.model');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * GET /api/admin/users
 * Get all users with some basic stats (Admin only)
 */
const getAllUsers = async (req, res) => {
  // Fetch users, exclude password, sort by newest
  const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 });
  res.json(successResponse(users, 'All users retrieved successfully.'));
};

/**
 * PUT /api/admin/users/:userId/status
 * Suspend or activate a user account
 */
const updateUserStatus = async (req, res) => {
  const { status } = req.body;

  if (!['active', 'suspended'].includes(status)) {
    return res.status(400).json(errorResponse('Invalid status. Must be active or suspended.'));
  }

  // Prevent admin from suspending themselves
  if (req.params.userId === req.user.id) {
    return res.status(400).json(errorResponse('You cannot change your own status.'));
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { status },
    { new: true, runValidators: true }
  ).select('-passwordHash');

  if (!user) {
    return res.status(404).json(errorResponse('User not found.'));
  }

  res.json(successResponse(user, `User status updated to ${status}.`));
};

/**
 * GET /api/admin/sites
 * Get all sites across the entire platform
 */
const getAllSites = async (req, res) => {
  // Populate the ownerId to get the user's name and email along with the site
  const sites = await Site.find({})
    .populate('ownerId', 'name email')
    .sort({ createdAt: -1 });
    
  res.json(successResponse(sites, 'All platform sites retrieved successfully.'));
};

/**
 * DELETE /api/admin/sites/:siteId
 * Delete a site (Admin force delete)
 */
const deleteSiteAsAdmin = async (req, res) => {
  const site = await Site.findByIdAndDelete(req.params.siteId);

  if (!site) {
    return res.status(404).json(errorResponse('Site not found.'));
  }

  // TODO: Cascade delete pages, media, and navigation for this site
  res.json(successResponse(null, 'Site deleted successfully by Admin.'));
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  getAllSites,
  deleteSiteAsAdmin
};
