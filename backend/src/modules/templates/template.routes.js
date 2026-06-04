const express = require("express");

const router = express.Router();
const { getTemplates, getTemplateById } = require("./template.controller");
const validate = require("../../middleware/validate");
const {
  listTemplatesRules,
  getTemplateByIdRules,
} = require("../../validators/template.validator");

router.get("/", listTemplatesRules, validate, getTemplates);
router.get("/:templateId", getTemplateByIdRules, validate, getTemplateById);

module.exports = router;
