const { errorResponse } = require('../utils/responseHelper');
const Site = require('../modules/sites/site.model');

/**
 * Check that the current user owns the requested site.
 * Attaches site to req.site for downstream use.
 */
const verifySiteOwner = async (req, res, next) => {
  const siteId = req.params.siteId;

  const site = await Site.findById(siteId);
  if (!site) {
    return res.status(404).json(errorResponse('Site not found.'));
  }

  // Admin can access any site
  if (req.user.role === 'admin') {
    req.site = site;
    return next();
  }

  // Owner check
  if (site.ownerId.toString() !== req.user.id) {
    return res.status(403).json(errorResponse('You do not have access to this site.'));
  }

  req.site = site;
  next();
};

module.exports = { verifySiteOwner };
