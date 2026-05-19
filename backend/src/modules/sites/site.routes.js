const express = require('express');
const router = express.Router();
const { verifyToken } = require('../auth/auth.middleware');
const { verifySiteOwner } = require('../../middleware/verifySiteOwner');
const { createSiteRules, updateSiteRules } = require('../../validators/site.validator');
const validate = require('../../middleware/validate');
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
router.post('/', createSiteRules, validate, createSite);
router.get('/:siteId', verifySiteOwner, getSiteById);
router.put('/:siteId', verifySiteOwner, updateSiteRules, validate, updateSite);
router.delete('/:siteId', verifySiteOwner, deleteSite);

module.exports = router;
