const Site = require('./site.model');
const { successResponse, errorResponse } = require('../../utils/responseHelper');

/**
 * Helper: generate slug from site name
 * "My Hotel Website" → "my-hotel-website"
 * Appends random suffix if slug already exists
 */
const generateSlug = async (name) => {
  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const existing = await Site.findOne({ slug });
  if (existing) {
    const suffix = Math.random().toString(36).substring(2, 7);
    slug = `${slug}-${suffix}`;
  }

  return slug;
};

/**
 * GET /api/sites
 */
const getAllSites = async (req, res) => {
  const sites = await Site.find({ ownerId: req.user.id }).sort({ createdAt: -1 });
  res.json(successResponse(sites, 'Sites retrieved successfully.'));
};

/**
 * POST /api/sites
 */
const createSite = async (req, res) => {
  const { name, templateId } = req.body;

  if (!name) {
    return res.status(400).json(errorResponse('Site name is required.'));
  }

  const slug = await generateSlug(name);
  const subdomain = slug;

  const site = await Site.create({
    ownerId: req.user.id,
    name,
    slug,
    subdomain,
    templateId: templateId || null,
  });

  res.status(201).json(successResponse(site, 'Site created successfully.'));
};

/**
 * GET /api/sites/:siteId
 */
const getSiteById = async (req, res) => {
  res.json(successResponse(req.site, 'Site retrieved successfully.'));
};

/**
 * PUT /api/sites/:siteId
 */
const updateSite = async (req, res) => {
  const { name } = req.body;

  const updateData = {};
  if (name) updateData.name = name;

  const site = await Site.findByIdAndUpdate(
    req.params.siteId,
    updateData,
    { new: true, runValidators: true }
  );

  res.json(successResponse(site, 'Site updated successfully.'));
};

/**
 * DELETE /api/sites/:siteId
 */
const deleteSite = async (req, res) => {
  await Site.findByIdAndDelete(req.params.siteId);
  // TODO: also delete related pages, navigation, media for this site
  res.json(successResponse(null, 'Site deleted successfully.'));
};

module.exports = { getAllSites, createSite, getSiteById, updateSite, deleteSite };
