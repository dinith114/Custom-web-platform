const express = require("express");

const router = express.Router();
const {
  getSiteBySlug,
  getPageBySlug,
  getNavigationBySiteSlug,
} = require("./public.controller");

router.get("/sites/:siteSlug", getSiteBySlug);
router.get("/sites/:siteSlug/pages/:pageSlug", getPageBySlug);
router.get("/sites/:siteSlug/navigation", getNavigationBySiteSlug);

module.exports = router;
