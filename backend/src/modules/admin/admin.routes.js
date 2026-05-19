const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRoles } = require('../auth/auth.middleware');
const {
  getAllUsers,
  updateUserStatus,
  getAllSites,
  deleteSiteAsAdmin
} = require('./admin.controller');

// Require authentication AND admin role for all routes in this file
router.use(verifyToken, authorizeRoles('admin'));

// User Management
router.get('/users', getAllUsers);
router.put('/users/:userId/status', updateUserStatus);

// Platform Site Management
router.get('/sites', getAllSites);
router.delete('/sites/:siteId', deleteSiteAsAdmin);

module.exports = router;
