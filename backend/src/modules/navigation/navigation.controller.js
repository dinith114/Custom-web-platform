const Navigation = require('./navigation.model');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * GET /api/sites/:siteId/navigation
 */
const getNavigation = async (req, res) => {
  const siteId = req.site?._id || req.params.siteId;
  let navigation = await Navigation.findOne({ siteId });

  if (!navigation) {
    return res.json(
      successResponse({ siteId, items: [] }, 'No navigation found. Returning empty.')
    );
  }

  res.json(successResponse(navigation, 'Navigation retrieved successfully.'));
};

/**
 * PUT /api/sites/:siteId/navigation
 */
const updateNavigation = async (req, res) => {
  const { items } = req.body;
  const siteId = req.site?._id || req.params.siteId;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json(errorResponse('Navigation items array is required.'));
  }

  const navigation = await Navigation.findOneAndUpdate(
    { siteId },
    { siteId, items },
    { returnDocument: 'after', upsert: true, runValidators: true }
  );

  res.json(successResponse(navigation, 'Navigation updated successfully.'));
};

module.exports = { getNavigation, updateNavigation };
