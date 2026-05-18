const express = require('express');
const router = express.Router({ mergeParams: true }); // access :siteId from parent
const { verifyToken } = require('../auth/auth.middleware');
const { verifySiteOwner } = require('../../middleware/verifySiteOwner');
const { getNavigation, updateNavigation } = require('./navigation.controller');

// All navigation routes require auth + site ownership
router.use(verifyToken);
router.use(verifySiteOwner);

router.get('/', getNavigation);
router.put('/', updateNavigation);

module.exports = router;
