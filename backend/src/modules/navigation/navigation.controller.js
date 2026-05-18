const Navigation = require('./navigation.model');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * GET /api/sites/:siteId/navigation
 */
const getNavigation = async (req, res) => {
  let navigation = await Navigation.findOne({ siteId: req.params.siteId });

  if (!navigation) {
    return res.json(
      successResponse({ siteId: req.params.siteId, items: [] }, 'No navigation found. Returning empty.')
    );
  }

  res.json(successResponse(navigation, 'Navigation retrieved successfully.'));
};

/**
 * PUT /api/sites/:siteId/navigation
 */
const updateNavigation = async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json(errorResponse('Navigation items array is required.'));
  }

  const navigation = await Navigation.findOneAndUpdate(
    { siteId: req.params.siteId },
    { siteId: req.params.siteId, items },
    { new: true, upsert: true, runValidators: true }
  );

  res.json(successResponse(navigation, 'Navigation updated successfully.'));
};

module.exports = { getNavigation, updateNavigation };
