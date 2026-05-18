const express = require('express');
const router = express.Router();
const { verifyToken } = require('../auth/auth.middleware');
const { verifySiteOwner } = require('../../middleware/verifySiteOwner');
const {
  getAllSites,
  createSite,
  getSiteById,
  updateSite,
  deleteSite,
} = require('./site.controller');

// All site routes require authentication
router.use(verifyToken);

// Site CRUD
router.get('/', getAllSites);
router.post('/', createSite);
router.get('/:siteId', verifySiteOwner, getSiteById);
router.put('/:siteId', verifySiteOwner, updateSite);
router.delete('/:siteId', verifySiteOwner, deleteSite);

module.exports = router;
