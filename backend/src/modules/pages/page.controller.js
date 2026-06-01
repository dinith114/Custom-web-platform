const Page = require("./page.model");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const normalizeSlug = (input, fallbackTitle) => {
  const raw = (input ?? fallbackTitle ?? "").toString().trim().toLowerCase();
  const withoutLeadingSlashes = raw.replace(/^\/+/, "");

  const slug = withoutLeadingSlashes
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug;
};

/**
 * GET /api/sites/:siteId/pages
 * Returns a lightweight list (no draft/published content).
 */
const listPages = async (req, res) => {
  const { siteId } = req.params;

  const pages = await Page.find({ siteId })
    .select("-draftContent -publishedContent")
    .sort({ createdAt: -1 });

  res.json(successResponse(pages, "Pages retrieved successfully."));
};

/**
 * POST /api/sites/:siteId/pages
 */
const createPage = async (req, res) => {
  const { siteId } = req.params;
  const { title, slug, isHomePage, draftContent, seoTitle, seoDescription } =
    req.body;

  if (!title) {
    return res.status(400).json(errorResponse("Page title is required."));
  }

  const normalizedSlug = normalizeSlug(slug, title);
  if (!normalizedSlug) {
    return res.status(400).json(errorResponse("Page slug is required."));
  }

  const existing = await Page.findOne({ siteId, slug: normalizedSlug });
  if (existing) {
    return res
      .status(409)
      .json(
        errorResponse("A page with this slug already exists for this site."),
      );
  }

  if (isHomePage === true) {
    await Page.updateMany(
      { siteId, isHomePage: true },
      { $set: { isHomePage: false } },
    );
  }

  const page = await Page.create({
    siteId,
    title,
    slug: normalizedSlug,
    isHomePage: isHomePage === true,
    draftContent: draftContent ?? null,
    seoTitle: seoTitle ?? null,
    seoDescription: seoDescription ?? null,
  });

  res.status(201).json(successResponse(page, "Page created successfully."));
};

/**
 * GET /api/sites/:siteId/pages/:pageId
 */
const getPageById = async (req, res) => {
  const { siteId, pageId } = req.params;

  const page = await Page.findOne({ _id: pageId, siteId });
  if (!page) {
    return res.status(404).json(errorResponse("Page not found."));
  }

  res.json(successResponse(page, "Page retrieved successfully."));
};

/**
 * PUT /api/sites/:siteId/pages/:pageId
 * Updates draft content + page metadata.
 */
const updatePage = async (req, res) => {
  const { siteId, pageId } = req.params;
  const { title, slug, isHomePage, draftContent, seoTitle, seoDescription } =
    req.body;

  const updateData = {};

  if (typeof title === "string") updateData.title = title;

  if (typeof slug === "string") {
    const normalizedSlug = normalizeSlug(slug, title);
    if (!normalizedSlug) {
      return res.status(400).json(errorResponse("Page slug is invalid."));
    }

    const existing = await Page.findOne({
      siteId,
      slug: normalizedSlug,
      _id: { $ne: pageId },
    });

    if (existing) {
      return res
        .status(409)
        .json(
          errorResponse("A page with this slug already exists for this site."),
        );
    }

    updateData.slug = normalizedSlug;
  }

  if (typeof isHomePage === "boolean") {
    updateData.isHomePage = isHomePage;
  }

  if (draftContent !== undefined) {
    updateData.draftContent = draftContent;
  }

  if (seoTitle !== undefined) {
    updateData.seoTitle = seoTitle;
  }

  if (seoDescription !== undefined) {
    updateData.seoDescription = seoDescription;
  }

  if (updateData.isHomePage === true) {
    await Page.updateMany(
      { siteId, isHomePage: true, _id: { $ne: pageId } },
      { $set: { isHomePage: false } },
    );
  }

  const page = await Page.findOneAndUpdate(
    { _id: pageId, siteId },
    updateData,
    { new: true, runValidators: true },
  );

  if (!page) {
    return res.status(404).json(errorResponse("Page not found."));
  }

  res.json(successResponse(page, "Page updated successfully."));
};

/**
 * DELETE /api/sites/:siteId/pages/:pageId
 */
const deletePage = async (req, res) => {
  const { siteId, pageId } = req.params;

  const deleted = await Page.findOneAndDelete({ _id: pageId, siteId });
  if (!deleted) {
    return res.status(404).json(errorResponse("Page not found."));
  }

  res.json(successResponse(null, "Page deleted successfully."));
};

module.exports = {
  listPages,
  createPage,
  getPageById,
  updatePage,
  deletePage,
};
