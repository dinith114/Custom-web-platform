const Site = require("./site.model");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

/**
 * Helper: generate slug from site name
 * "My Hotel Website" → "my-hotel-website"
 * Appends random suffix if slug already exists
 */
const generateSlug = async (name) => {
  const base = (name ?? "").toString().trim();
  if (!base) return "";

  let slug = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  slug = slug.replace(/^-|-$/g, "");
  if (!slug) return "";

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
  const sites = await Site.find({ ownerId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(successResponse(sites, "Sites retrieved successfully."));
};

/**
 * POST /api/sites
 */
const createSite = async (req, res) => {
  const { name, templateId } = req.body;

  if (!name) {
    return res.status(400).json(errorResponse("Site name is required."));
  }

  const slug = await generateSlug(name);
  if (!slug) {
    return res
      .status(400)
      .json(errorResponse("Unable to generate a valid slug from site name."));
  }
  const subdomain = slug;

  const site = await Site.create({
    ownerId: req.user.id,
    name,
    slug,
    subdomain,
    templateId: templateId || null,
  });

  res.status(201).json(successResponse(site, "Site created successfully."));
};

/**
 * GET /api/sites/:siteId
 */
const getSiteById = async (req, res) => {
  res.json(successResponse(req.site, "Site retrieved successfully."));
};

/**
 * PUT /api/sites/:siteId
 */
const updateSite = async (req, res) => {
  const { name, customDomain, templateId, status } = req.body;

  const updateData = {};
  if (typeof name === "string") updateData.name = name;

  if (customDomain !== undefined) {
    updateData.customDomain = customDomain === "" ? null : customDomain;
  }

  if (templateId !== undefined) {
    updateData.templateId = templateId || null;
  }

  if (typeof status === "string") {
    updateData.status = status;
    if (status === "published") {
      updateData.publishedAt = req.site?.publishedAt || new Date();
    }
    if (status === "draft") {
      updateData.publishedAt = null;
    }
  }

  const site = await Site.findByIdAndUpdate(req.site._id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  res.json(successResponse(site, "Site updated successfully."));
};

/**
 * DELETE /api/sites/:siteId
 */
const deleteSite = async (req, res) => {
  const siteId = req.site._id;

  // Delete related site data (best-effort, but fail loudly if something goes wrong)
  const Page = require("../pages/page.model");
  const Navigation = require("../navigation/navigation.model");
  const Media = require("../media/media.model");

  await Promise.all([
    Page.deleteMany({ siteId }),
    Navigation.deleteOne({ siteId }),
    Media.deleteMany({ siteId }),
  ]);

  await Site.findByIdAndDelete(siteId);
  res.json(successResponse(null, "Site deleted successfully."));
};

module.exports = {
  getAllSites,
  createSite,
  getSiteById,
  updateSite,
  deleteSite,
};
