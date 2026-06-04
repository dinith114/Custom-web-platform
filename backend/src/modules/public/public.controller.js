const Site = require("../sites/site.model");
const Page = require("../pages/page.model");
const Navigation = require("../navigation/navigation.model");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const normalizeSlug = (input) => {
  const raw = (input ?? "").toString().trim().toLowerCase();
  return raw.replace(/^\/+|\/+$/g, "");
};

const formatPublicSite = (site) => ({
  _id: site._id,
  name: site.name,
  slug: site.slug,
  subdomain: site.subdomain ?? null,
  customDomain: site.customDomain ?? null,
  status: site.status,
  publishedAt: site.publishedAt ?? null,
  templateId: site.templateId ?? null,
});

const getPublishedNavigation = async (siteId) => {
  const navigation = await Navigation.findOne({ siteId }).lean();

  if (!navigation) {
    return { siteId, items: [] };
  }

  return {
    siteId: navigation.siteId,
    items: navigation.items ?? [],
    updatedAt: navigation.updatedAt ?? null,
  };
};

const getPublishedHomePage = async (siteId) => {
  const homePage = await Page.findOne({
    siteId,
    status: "published",
    isHomePage: true,
    publishedContent: { $ne: null },
  })
    .select("-draftContent -__v")
    .lean();

  if (homePage) {
    return homePage;
  }

  return Page.findOne({
    siteId,
    status: "published",
    publishedContent: { $ne: null },
  })
    .sort({ isHomePage: -1, createdAt: 1 })
    .select("-draftContent -__v")
    .lean();
};

const getSiteBySlug = async (req, res) => {
  const siteSlug = normalizeSlug(req.params.siteSlug);
  if (!siteSlug) {
    return res.status(404).json(errorResponse("Site not found."));
  }

  const site = await Site.findOne({
    slug: siteSlug,
    status: "published",
  }).lean();
  if (!site) {
    return res.status(404).json(errorResponse("Published site not found."));
  }

  const [homepage, navigation] = await Promise.all([
    getPublishedHomePage(site._id),
    getPublishedNavigation(site._id),
  ]);

  if (!homepage) {
    return res.status(404).json(errorResponse("Published homepage not found."));
  }

  return res.json(
    successResponse(
      {
        site: formatPublicSite(site),
        homepage,
        navigation,
      },
      "Published site retrieved successfully.",
    ),
  );
};

const getPageBySlug = async (req, res) => {
  const siteSlug = normalizeSlug(req.params.siteSlug);
  const pageSlug = normalizeSlug(req.params.pageSlug);

  if (!siteSlug || !pageSlug) {
    return res.status(404).json(errorResponse("Page not found."));
  }

  const site = await Site.findOne({
    slug: siteSlug,
    status: "published",
  }).lean();
  if (!site) {
    return res.status(404).json(errorResponse("Published site not found."));
  }

  const [page, navigation] = await Promise.all([
    Page.findOne({
      siteId: site._id,
      slug: pageSlug,
      status: "published",
      publishedContent: { $ne: null },
    })
      .select("-draftContent -__v")
      .lean(),
    getPublishedNavigation(site._id),
  ]);

  if (!page) {
    return res.status(404).json(errorResponse("Published page not found."));
  }

  return res.json(
    successResponse(
      {
        site: formatPublicSite(site),
        page,
        navigation,
      },
      "Published page retrieved successfully.",
    ),
  );
};

const getNavigationBySiteSlug = async (req, res) => {
  const siteSlug = normalizeSlug(req.params.siteSlug);
  if (!siteSlug) {
    return res.status(404).json(errorResponse("Site not found."));
  }

  const site = await Site.findOne({
    slug: siteSlug,
    status: "published",
  }).lean();
  if (!site) {
    return res.status(404).json(errorResponse("Published site not found."));
  }

  const navigation = await getPublishedNavigation(site._id);

  return res.json(
    successResponse(
      {
        site: formatPublicSite(site),
        navigation,
      },
      "Published navigation retrieved successfully.",
    ),
  );
};

module.exports = {
  getSiteBySlug,
  getPageBySlug,
  getNavigationBySiteSlug,
};
