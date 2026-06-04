const { query, param } = require("express-validator");

const allowedTemplateCategories = [
  "business",
  "portfolio",
  "ecommerce",
  "blog",
  "landing",
];

const listTemplatesRules = [
  query("category")
    .optional()
    .trim()
    .isIn(allowedTemplateCategories)
    .withMessage(
      `category must be one of: ${allowedTemplateCategories.join(", ")}`,
    ),
];

const getTemplateByIdRules = [
  param("templateId")
    .isMongoId()
    .withMessage("Template ID must be a valid MongoDB ObjectId."),
];

module.exports = {
  allowedTemplateCategories,
  listTemplatesRules,
  getTemplateByIdRules,
};
