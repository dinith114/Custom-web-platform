const express = require("express");
const router = express.Router({ mergeParams: true });

const { verifyToken } = require("../auth/auth.middleware");
const { verifySiteOwner } = require("../../middleware/verifySiteOwner");
const validate = require("../../middleware/validate");
const {
  createPageRules,
  updatePageRules,
} = require("../../validators/page.validator");

const {
  listPages,
  createPage,
  getPageById,
  updatePage,
  publishPage,
  deletePage,
} = require("./page.controller");

// All pages routes require auth + site ownership
router.use(verifyToken);
router.use(verifySiteOwner);

router.get("/", listPages);
router.post("/", createPageRules, validate, createPage);
router.get("/:pageId", getPageById);
router.put("/:pageId", updatePageRules, validate, updatePage);
router.post("/:pageId/publish", publishPage);
router.delete("/:pageId", deletePage);

module.exports = router;
